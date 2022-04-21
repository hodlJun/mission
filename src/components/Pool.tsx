import { useState, useEffect, useCallback } from 'react';
import {
  getContract,
  getPoolLength,
  getPoolInfo,
  arowanaDecimal,
  decimal,
} from '../utils/Web3';
import { dayDiff, timestampHelper } from '../utils/ConvertDate';
import { requestInfo } from '../helper/Api';
import Table from './table/Table';
import TableBody from './table/TableBody';

const Pool = () => {
  const [isLoading, setisLoading] = useState(false);
  const [pool, setPool] = useState([]);
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
    // 직접 메인넷 호출
    console.log('loadPool 호출');
    setisLoading(true);
    const contract = getContract();
    const length = await getPoolLength(contract as any);
    const poolData: any = await poolInfo(length as any);

    if (poolData !== undefined && poolData.length > 0) {
      setPool(poolData as any);
      setisLoading(false);
    }
  }, [poolInfo]);

  const loadAPI = useCallback(async () => {
    // API 호출
    let result;
    setisLoading(true);
    try {
      result = await requestInfo('pool');

      if (result.pool.length > 0) {
        setPool(result.pool);
      }
    } catch (err) {
      result = err;
      throw new Error(`${result}`);
    } finally {
      setisLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAPI().catch(() => loadPool());
    return () => {};
  }, [loadAPI, loadPool]);

  return (
    <>
      <Table caption={caption} thead={th}>
        {
          <tbody>
            {pool !== undefined &&
              pool.length > 0 &&
              !error &&
              pool.map((info: any, key: any) => {
                const id =
                  typeof info.id !== 'string'
                    ? Number(info.pid)
                    : info.id.slice(1);
                const open = timestampHelper(info.open);
                const start = timestampHelper(info.start);
                const end = timestampHelper(info.end);
                let diff = dayDiff(info.end, info.start);

                if (info.diff !== undefined) {
                  diff = info.diff;
                }

                if (info.finalAmount === undefined) {
                  info.finalAmount = info.finalamount;
                }

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
                    userpool={info.pooluser}
                    spanValue={th.length}
                  />
                );
              })}
          </tbody>
        }
      </Table>
      {isLoading && pool.length === 0 && (
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
