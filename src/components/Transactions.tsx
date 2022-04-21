import { useState, useEffect, useCallback } from 'react';
import { getWeb3, arowanaDecimal, decimal } from '../utils/Web3';
import {
  getEvents,
  eventFilter,
  getDepositWithdraw,
  getReward,
} from '../utils/EventSubscription';
import { timestampHelper } from '../utils/ConvertDate';
import { requestInfo } from '../helper/Api';
import Table from '../components/table/Table';
import TableBody from '../components/table/TableBody';
import classes from '../Styles/Table.module.css';

const Transactions = () => {
  const [isLoading, setisLoading] = useState(false);
  const [txs, setTxs] = useState([]);
  const [error, setError] = useState(false);

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

  const filteredTxs = useCallback(async (_preTxsArray: []) => {
    try {
      const timestamp_pid_amount = [];
      const ArrayObject = [];
      const web3 = getWeb3();
      const result: any = _preTxsArray.filter(eventFilter);
      const blockNumber = result.map((tx: any) => tx.blockNumber);

      for (let i = 0; i < blockNumber.length; i++) {
        console.log(i);
        const { timestamp }: any = await web3.eth.getBlock(
          blockNumber[i] as any
        );

        const { pid, amount } = getDepositWithdraw(result[i]);
        timestamp_pid_amount.push({ timestamp, pid, amount });
      }

      const list = [];

      for (let i = 0; i < result.length; i++) {
        list.push(web3.eth.getTransactionReceipt(result[i].transactionHash));
      }
      const from_gasUsed_gasPrice = await Promise.all(list);
      const arowanaDec = await arowanaDecimal();

      for (let i = 0; i < timestamp_pid_amount.length; i++) {
        const { timestamp: txdate, pid } = timestamp_pid_amount[i];
        let { amount }: any = timestamp_pid_amount[i];
        let reward: any = '-';
        const {
          gasUsed,
          effectiveGasPrice,
          from: fromaddress,
        } = from_gasUsed_gasPrice[i];
        const txFee = gasUsed * effectiveGasPrice;
        const convertedTxFee = decimal(txFee, arowanaDec);
        const eventname = result[i].event;

        if (amount !== '-') {
          amount = decimal(amount, arowanaDec);
          reward = await getReward(pid, fromaddress).then((reward) => {
            if (reward !== '-') {
              return decimal(reward, arowanaDec);
            }
            return '-';
          });
        }

        ArrayObject.push({
          id: 't' + i,
          txdate,
          fromaddress,
          amount,
          pid,
          reward,
          txfee: convertedTxFee,
          eventname,
        });
      }

      return ArrayObject;
    } catch (err) {
      setError(true);
    }
  }, []);

  const loadTxs = useCallback(async () => {
    // 직접 메인넷 호출
    setisLoading(true);
    const events = await getEvents();
    const data: any = await filteredTxs(events as any);

    if (data !== undefined && data.length > 0) {
      setTxs(data);
      setisLoading(false);
    }
  }, [filteredTxs]);

  const loadAPI = useCallback(async () => {
    // API 호출
    let result;
    setisLoading(true);
    try {
      result = await requestInfo('txs');

      if (result.txs.length > 0) {
        setTxs(result.txs);
      }
    } catch (err) {
      result = err;
      throw new Error(`${result}`);
    } finally {
      setisLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAPI().catch(() => loadTxs());
    return () => {};
  }, [loadAPI, loadTxs]);

  return (
    <>
      <Table className={classes.table} caption={caption} thead={th}>
        {
          <tbody>
            {txs.length > 0 &&
              !error &&
              txs.map((tx: any, key: any) => {
                const timestamp = timestampHelper(tx.txdate);

                const td = [
                  timestamp,
                  tx.fromaddress,
                  tx.amount,
                  tx.pid,
                  tx.reward,
                  tx.txfee,
                  tx.eventname,
                ];
                return (
                  <TableBody key={key} bkey={tx.id} tbody={td}></TableBody>
                );
              })}
          </tbody>
        }
      </Table>
      {isLoading && txs.length === 0 && (
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

export default Transactions;
