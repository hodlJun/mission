import { useState, useEffect, useCallback } from 'react';
import {
  getContract,
  getPoolLength,
  getPoolInfo,
  arowanaDecimal,
  decimal,
} from '../utils/Web3';
import { dayDiff } from '../utils/ConvertDate';
import { convertToDate } from '../utils/ConvertDate';
import Table from './table/Table';
import TableBody from './table/TableBody';

const Pool = () => {
  const [isLoading, setisLoading] = useState(false);
  const [list, setList] = useState([]);
  const [error, setError] = useState(false);

  const caption = 'Pool Info';
  const th = [
    { id: 'h0', title: 'PID', width: 5 },
    { id: 'h1', title: '오픈일', width: 10 },
    { id: 'h2', title: '시작일', width: 10 },
    { id: 'h3', title: '종료일', width: 10 },
    { id: 'h4', title: '기간', width: 5 },
    { id: 'h5', title: 'APR', width: 5 },
    { id: 'h6', title: 'CAP', width: 5 },
    { id: 'h7', title: 'FinalAmount', width: 17.5 },
    { id: 'h8', title: 'Amount', width: 17.5 },
    { id: 'h9', title: '비율', width: 15 },
  ];

  const poolInfo = useCallback(async (_poolNumber: number) => {
    try {
      const contract = getContract();
      const array = [];
      const arowanaDec = await arowanaDecimal();

      for (let i = 0; i < _poolNumber; i++) {
        const obj = await getPoolInfo(contract as any, i);
        const convertCap = decimal(obj.cap, arowanaDec);
        const convertAmount = decimal(obj.amount, arowanaDec);
        const convertFinalAmount = decimal(obj.finalAmount, arowanaDec);
        const ratio =
          (parseFloat(convertFinalAmount) / parseFloat(convertCap)) * 100;

        obj.id = 'p' + i;
        obj.cap = convertCap;
        obj.amount = convertAmount;
        obj.finalAmount = convertFinalAmount;
        obj.ratio = ratio;
        array.push(obj);
      }

      return array;
    } catch (err) {
      setError(true);
    }
  }, []);

  const loadPool = useCallback(async () => {
    setisLoading(true);
    const contract = getContract();
    const length = await getPoolLength(contract as any);
    const poolData: any = await poolInfo(length as any);

    if (poolData !== undefined && poolData.length > 0) {
      setList(poolData as any);
      setisLoading(false);
    }
  }, [poolInfo]);

  useEffect(() => {
    loadPool();
    return () => {};
  }, [loadPool]);

  return (
    <>
      <Table caption={caption} thead={th}>
        {
          <tbody>
            {list.length > 0 &&
              !error &&
              list.map((info: any, key: any) => {
                const id = info.id.slice(1);
                const open = convertToDate(info.open);
                const start = convertToDate(info.start);
                const end = convertToDate(info.end);
                const diff = dayDiff(info.end, info.start);
                const td = [
                  id,
                  open,
                  start,
                  end,
                  diff,
                  info.apr,
                  info.cap,
                  info.finalAmount,
                  info.amount,
                  info.ratio,
                ];
                return (
                  <TableBody
                    key={key}
                    bkey={info.id}
                    tbody={td}
                    spanValue={th.length}
                  />
                );
              })}
          </tbody>
        }
      </Table>
      {isLoading && list.length === 0 && (
        <p
          style={{
            padding: '10rem',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '1.2rem',
          }}
        >
          isLoading...
        </p>
      )}
      {!isLoading && error && <p>Error. please refresh this page.</p>}
    </>
  );
};
export default Pool;
