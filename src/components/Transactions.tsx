import { useState, useEffect, useCallback } from 'react';
import { getWeb3, getEvents } from '../utils/Web3';

const Transactions = () => {
  const [isLoading, setisLoading] = useState(false);
  const [txs, setTxs] = useState([]);

  const eventFilter = (obj: any) => {
    const filterWords = ['Pool', 'Deposit', 'Withdraw'];
    if (filterWords.includes(obj.event)) {
      return obj;
    }
    // return;
  };

  const filteredTxs = useCallback(async (preTxsArray: []) => {
    const web3 = getWeb3();
    const result = preTxsArray.filter(eventFilter);
    // result.map(obj => obj.raw.topics)
    // console.log(result);

    const blockNumber = result.map((tx: any) => tx.blockNumber); // 블록넘버

    const timeStampArray = [];
    const fromArray = [];
    // const block = await (await web3.eth.getBlock(14306593, true)).transactions;
    // console.log(block);

    const TimeStamp_fromAddress = (obj: any, index: number, txArray: any) => {
      const timestamp = obj.timestamp;
      const transactions = obj.transactions;
      console.log(transactions);
      console.log(txArray[index]);
      console.log('obj : ', obj);
      console.log(
        'obj.hash : ',
        obj.hash,
        `txArray${index}.transactionHash : `,
        txArray[index].transactionHash
      );
      // obj 블록정보
      // obj.transactions[] 해당블록의 트랜잭션들
      // txArray[index]
      const filteredfromAddress = transactions.filter(
        (obj: any) => obj.hash === txArray[index].transactionHash
      );
      console.log(filteredfromAddress);
      const from = filteredfromAddress.from;
      // console.log('추출된 obj의 from : ', from);
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
    console.log(blockNumber);
    console.log('timeStampArray : ', timeStampArray);
    console.log('fromArray : ', fromArray);

    // return result;
  }, []);

  const LoadTxs = useCallback(async () => {
    setisLoading(true);
    const event = await getEvents();
    const { result }: any = filteredTxs(event as any);
    // console.log();
    setTxs(result);
    setisLoading(false);
  }, [filteredTxs]);

  useEffect(() => {
    LoadTxs();
  }, [LoadTxs]);

  return (
    <div>
      <h1>Contract Tx Info</h1>
      {!isLoading &&
        txs !== undefined &&
        txs.map((key: any, tx: any) => {
          return (
            <div key={key}>
              {}
              <div key={key} style={{ display: 'flex' }}>
                <div style={{ margin: '5px' }}>{}</div>
                <div style={{ margin: '5px' }}>{}</div>
                <div style={{ margin: '5px' }}>{}</div>
                <div style={{ margin: '5px' }}>{}</div>
                <div style={{ margin: '5px' }}>{}</div>
                <div style={{ margin: '5px' }}>{}</div>
                <div style={{ margin: '5px' }}>{}</div>
                <div style={{ margin: '5px' }}>{}</div>
                <div style={{ margin: '5px' }}>{}</div>
                <div style={{ margin: '5px' }}>{}</div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Transactions;
