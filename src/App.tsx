import { useState, useEffect, useCallback } from 'react';
import {
  getContract,
  getPoolLength,
  getPoolInfo,
  getEvents,
  arowanaDecimal,
  decimal,
} from './utils/Web3';
import { dayDiff } from './utils/ConvertDate';
import { convertToDate } from './utils/ConvertDate';

// async await 줄이기
// contract 를 매번 불러올지 아니면 한번 부르고 나머지는 메소드 실행만 하게할지
// => 지금은 매번 getContact 함수를 불러서하는형태임
// 코드 개선부분 찾을것

function App() {
  const [isLoading, setisLoading] = useState(false);
  const [list, setList] = useState([]);

  const poolLength = useCallback(async () => {
    const contract = await getContract();
    const poolLength = await getPoolLength(contract as any);
    return poolLength;
  }, []);

  const poolInfo = useCallback(async (poolNumber: number) => {
    const contract = await getContract();
    const array = [];
    const arowanaDec = await arowanaDecimal();
    for (let i = 0; i < poolNumber; i++) {
      const obj = await getPoolInfo(contract as any, i);
      const convertCap = await decimal(obj.cap, arowanaDec);
      const convertAmount = await decimal(obj.amount, arowanaDec);
      obj.cap = convertCap;
      obj.amount = convertAmount;
      array.push(obj);
    }
    return array;
  }, []);

  const loadPool = useCallback(async () => {
    setisLoading(true);
    const length = await poolLength();
    const poolData = await poolInfo(length as any);
    const event = await getEvents();

    if (event !== undefined) {
      event.forEach((obj) => {
        console.log(obj.event);
        console.log(obj.blockNumber);
      });
    }

    if (poolData.length > 0) {
      setList(poolData as any);
      setisLoading(false);
    }
  }, [poolLength, poolInfo]);

  useEffect(() => {
    loadPool();
  }, [loadPool]);

  return (
    <div>
      {!isLoading &&
        list.length > 0 &&
        list.map((info: any, key: any) => {
          const open = convertToDate(info.open);
          const start = convertToDate(info.start);
          const end = convertToDate(info.end);
          return (
            <div key={key} style={{ display: 'flex' }}>
              <div style={{ margin: '5px' }}>{open}</div>
              <div style={{ margin: '5px' }}>{start}</div>
              <div style={{ margin: '5px' }}>{end}</div>
              <div style={{ margin: '5px' }}>{info.open}</div>
              <div style={{ margin: '5px' }}>{info.start}</div>
              <div style={{ margin: '5px' }}>{info.end}</div>
              <div style={{ margin: '5px' }}>
                {dayDiff(info.end, info.start)}
              </div>
              <div style={{ margin: '5px' }}>{info.apr}</div>
              <div style={{ margin: '5px' }}>{info.cap}</div>
              <div style={{ margin: '5px' }}>{info.amount}</div>
            </div>
          );
        })}

      <div>
        <h1>Contract Tx</h1>
      </div>
    </div>
  );
}

export default App;
