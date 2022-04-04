import { useState, useEffect, useCallback } from 'react';
import { getWeb3, arowanaDecimal, decimal } from '../utils/Web3';
import {
  getDepositWithdraw,
  getEvents,
  getReward,
  getTxFee,
} from '../utils/EventSubscription';
import { convertToDate } from '../utils/ConvertDate';
import Table from '../components/table/Table';
import TableBody from '../components/table/TableBody';
import classes from '../Styles/Loading.module.css';

const Transactions = () => {
  const [isLoading, setisLoading] = useState(false);
  const [txs, setTxs] = useState([]);

  const caption = 'Transaction Info';
  const th = [
    { id: 'h1', title: '날짜', width: 10 },
    { id: 'h2', title: '주소', width: 30 },
    { id: 'h3', title: 'Amount', width: 10 },
    { id: 'h4', title: 'PID', width: 5 },
    { id: 'h5', title: '예상 Reward', width: 15 },
    { id: 'h6', title: 'Tx Fee', width: 20 },
    { id: 'h7', title: 'Event', width: 10 },
  ];

  const eventFilter = (_obj: any) => {
    const filterWords = ['Pool', 'Deposit', 'Withdraw'];
    if (filterWords.includes(_obj.event)) {
      return _obj;
    }
  };

  const filteredTxs = useCallback(async (_preTxsArray: []) => {
    const timeStampArray = [];
    const fromArray = [];
    const ArrayObject = []; // pool id 와 amount 가 담긴 객체 베열
    const web3 = getWeb3();
    const result: any = _preTxsArray.filter(eventFilter);
    const txsPidAmount = await getDepositWithdraw(result);
    const blockNumber = result.map((tx: any) => tx.blockNumber); // 블록넘버

    const TimeStamp_fromAddress = (
      _obj: any,
      _index: number,
      _txArray: any
    ) => {
      const timestamp = _obj.timestamp;
      const transactions = _obj.transactions;
      const filteredfromAddress = transactions.filter(
        (obj: any) => obj.hash === _txArray[_index].transactionHash
      );
      const from = filteredfromAddress[0].from;
      return { timestamp, from };
    };

    for (let i = 0; i < blockNumber.length; i++) {
      console.log(i);
      const { timestamp, from } = await web3.eth
        .getBlock(blockNumber[i] as any, true)
        .then((obj) => TimeStamp_fromAddress(obj, i, result as any));

      timeStampArray.push(timestamp);
      fromArray.push(from);
    }

    for (let i = 0; i < timeStampArray.length; i++) {
      const timestamp = timeStampArray[i];
      const fromAddress = fromArray[i];
      const { pid } = txsPidAmount[i];
      let { amount }: any = txsPidAmount[i];
      let reward: any = '-';
      const arowanaDec = await arowanaDecimal();
      const txFee = await getTxFee(result[i].transactionHash);
      // console.log(txFee);
      const convertedTxFee = await decimal(txFee, arowanaDec);
      const event = result[i].event;

      if (amount !== '-') {
        amount = await decimal(amount, arowanaDec);
        reward = await getReward(pid, fromAddress);
      }

      // console.log(timestamp, fromAddress, amount, pid, reward, txFee);
      ArrayObject.push({
        id: 't' + i,
        timestamp,
        from: fromAddress,
        amount: amount,
        pid,
        reward,
        txFee: convertedTxFee,
        event,
      });
    }
    return ArrayObject;
  }, []);

  const LoadTxs = useCallback(async () => {
    setisLoading(true);
    const event = await getEvents();
    const data: any = await filteredTxs(event as any);
    // console.log('set 전에 data : ', data);
    if (data.length > 0) {
      // console.log('if문 통과 후 : ', data);
      setTxs(data);
      setisLoading(false);
    }
  }, [filteredTxs]);

  useEffect(() => {
    // console.log('이펙트');
    LoadTxs();
    return () => {
      // console.log('트랜잭션 종료');
    };
  }, [LoadTxs]);

  return (
    <>
      <Table caption={caption} thead={th}>
        {
          <tbody>
            {txs.length > 0 &&
              txs.map((tx: any, key: any) => {
                const timestamp = convertToDate(tx.timestamp);
                const td = [
                  timestamp,
                  tx.from,
                  tx.amount,
                  tx.pid,
                  tx.reward,
                  tx.txFee,
                  tx.event,
                ];
                return (
                  <TableBody key={key} bkey={tx.id} tbody={td}></TableBody>
                );
              })}
          </tbody>
        }
      </Table>
      {isLoading && txs.length === 0 && (
        <p className={classes.loading}>isLoading...</p>
      )}
    </>
  );
};

export default Transactions;
