import { getWeb3 } from './Web3';
import { getContract } from '../utils/Web3';

export const getEvents = async () => {
  const contract = getContract();
  const events = await contract.getPastEvents('allEvents', {
    fromBlock: 'genesis',
    toBlock: 'latest',
  });

  return events;
};

export const getDepositWithdraw = (_preTxsArray: any) => {
  const filterWords = ['Deposit', 'Withdraw'];

  const pidAmountArray = [];

  for (let i = 0; i < _preTxsArray.length; i++) {
    const event = _preTxsArray[i].event;
    let pid = '-';
    let amount = '-';

    if (filterWords.includes(event)) {
      pid = _preTxsArray[i].returnValues.pid;
      amount = _preTxsArray[i].returnValues.amount;
    }

    pidAmountArray.push({ pid, amount });
  }

  return pidAmountArray;
};

export const getReward = async (_pid: any, _address: any) => {
  const contract = getContract();
  let reward = '-';
  const filteredReward = await contract.methods
    .userInfo(_pid, _address)
    .call()
    .then((obj: any) => obj.reward);
  if (filteredReward !== '0') {
    reward = filteredReward;
  }
  // return await contract.methods
  //   .userInfo(_pid, _address)
  //   .call()
  //   .then((obj: any) => obj.reward);
  return reward;
};

export const getTxFee = async (_txHash: any) => {
  const web3 = getWeb3();
  const { gasUsed, effectiveGasPrice } = await web3.eth.getTransactionReceipt(
    _txHash
  );
  // gasUsed * cumulativeGasUsed = tx fee;
  const txFee = gasUsed * effectiveGasPrice;

  return txFee;
};
// Add가 Pool 로 표기되고 다른
// contract abi 에서 148번줄 => add가 Pool로 표기되어 이벤트시에도 Pool로 표기예상
// pool => Add
// deposit => Deposit
// widthdraw => Widthdraw

// 3개만 가져올것으로

// time, from address / value / pid / 예상 reward / 각 이벤트당 소요된 가스비
// approve, deposit, withdraw

/* 
  
  time: web.eth.getBlock(number)
  fromaddress: 트랜잭션에서 출발지 가져올것
  얼마 => amount ? uint 256 => decimal로 잘라서
  
  */

// yourNumber = parseInt(hexString, 16);

// add 일시는 양 없음
// deposit 일때는 있음
// returnValues 에서 찾으면 pid 랑 나옴

/* 
  // 이벤트에 해당되는 트랜잭션들 배열로 가져옴 ( 출발지 도착지 X)
  1. 순서대로 해당 객체의 블록넘버를 가져옴
  2. 해당 블록의 타임스탬프 가져옴 ( time이 됨)
  3. 컨트랙트내의 트랜잭션 주소와 블록안의 트랜잭션들에서 동일한 트랜잭션 주소를 가진 객체를 찾고 해당 객체의 from 값을 받아옴
  4. 
  
  */

// value pid 예상 reward 각 이벤트당 소요된 가스비 남음
