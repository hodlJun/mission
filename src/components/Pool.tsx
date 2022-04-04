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
import classes from '../Styles/Loading.module.css';

const Pool = () => {
  const [isLoading, setisLoading] = useState(false);
  const [list, setList] = useState([]);

  const caption = 'Pool Info';
  const th = [
    { id: 'h1', title: '오픈일', width: 10 },
    { id: 'h2', title: '시작일', width: 10 },
    { id: 'h3', title: '종료일', width: 10 },
    { id: 'h4', title: '오픈유닉스', width: 10 },
    { id: 'h5', title: '시작유닉스', width: 10 },
    { id: 'h6', title: '종료유닉스', width: 10 },
    { id: 'h7', title: '기간', width: 5 },
    { id: 'h8', title: 'APR', width: 5 },
    { id: 'h9', title: 'CAP', width: 10 },
    { id: 'h10', title: 'Amount', width: 20 },
  ];

  const poolLength = useCallback(async () => {
    const contract = await getContract();
    const poolLength = await getPoolLength(contract as any);

    return poolLength;
  }, []);

  const poolInfo = useCallback(async (_poolNumber: number) => {
    const contract = await getContract();
    const array = [];
    const arowanaDec = await arowanaDecimal();
    for (let i = 0; i < _poolNumber; i++) {
      const obj = await getPoolInfo(contract as any, i);
      const convertCap = await decimal(obj.cap, arowanaDec);
      const convertAmount = await decimal(obj.amount, arowanaDec);
      obj.id = 'p' + i;
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

    if (poolData.length > 0 && list.length === 0) {
      setList(poolData as any);
      setisLoading(false);
    }
  }, [list, poolInfo, poolLength]);

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
              list.map((info: any, key: any) => {
                const open = convertToDate(info.open);
                const start = convertToDate(info.start);
                const end = convertToDate(info.end);
                const diff = dayDiff(info.end, info.start);
                const td = [
                  open,
                  start,
                  end,
                  info.open,
                  info.start,
                  info.end,
                  diff,
                  info.apr,
                  info.cap,
                  info.amount,
                ];
                return (
                  <TableBody key={key} bkey={info.id} tbody={td}></TableBody>
                );
              })}
          </tbody>
        }
      </Table>
      {isLoading && list.length === 0 && (
        <p className={classes.loading}>isLoading...</p>
      )}
    </>
  );
};
export default Pool;

// <div key={key} style={{ display: 'flex' }}>
//   <div style={{ margin: '5px' }}>{open}</div>
//   <div style={{ margin: '5px' }}>{start}</div>
//   <div style={{ margin: '5px' }}>{end}</div>
//   <div style={{ margin: '5px' }}>{info.open}</div>
//   <div style={{ margin: '5px' }}>{info.start}</div>
//   <div style={{ margin: '5px' }}>{info.end}</div>
//   <div style={{ margin: '5px' }}>
//     {diff}
//   </div>
//   <div style={{ margin: '5px' }}>{info.apr}</div>
//   <div style={{ margin: '5px' }}>{info.cap}</div>
//   <div style={{ margin: '5px' }}>{info.amount}</div>
// </div>
