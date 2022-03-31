import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { Contract } from 'web3-eth-contract';
import PoolContractABI from './abi/PoolContract.json';
import ArowanaABI from './abi/ArowanaContract.json';
// import dotenv from 'dotenv';

export const getWeb3 = () => {
  return new Web3((window as any).ethereum);
};

export const getContract = (contractName = 'main') => {
  // 다른곳에서도 쓸수있게 chaindId 검증기능 추가필요
  const web3 = getWeb3();
  let ContractABI = PoolContractABI as unknown as AbiItem;
  let Address = process.env.REACT_APP_MAINNET_POOL_CONTRACT_ADDRESS;

  if (contractName === 'arowana') {
    ContractABI = ArowanaABI as unknown as AbiItem;
    Address = process.env.REACT_APP_MAINNET_AROWANA_CONTRACT_ADDRESS;
  }

  const contract = new web3.eth.Contract(
    ContractABI as unknown as AbiItem,
    Address
  );

  return contract;
};

export const getPoolLength = async (contract: Contract) => {
  return await contract.methods.poolLength().call();
};

export const getPoolInfo = async (contract: Contract, number: number) => {
  const obj = await contract.methods.poolInfo(number).call();
  return obj;
};

export const arowanaDecimal = async () => {
  const contract = getContract('arowana');
  const result = await contract.methods.decimals().call(); // exe revert
  return result;
};

export const decimal = async (wei: any, decimal: number = 18) => {
  const web3 = getWeb3();
  if (+decimal === 18) {
    const result = await web3.utils.fromWei(wei.toString(), 'ether');
    return result;
  }
  // 다른 decimal에 대한 값 추가해야함
};

export const getEvents = async () => {
  const web3 = getWeb3();
  const contract = getContract();
  const events = await contract.getPastEvents('allEvents', {
    fromBlock: 'genesis',
    toBlock: 'latest',
  });

  // const txFrom = await web3.eth
  //   .getBlock(14306593, true)
  //   .then((obj) => obj.transactions)
  //   .then((array) =>
  //     array.filter(
  //       (arr) =>
  //         arr.from ===
  //         '0x5ce11f4c7ba8f9baca3d80c61ff339e83ce9881cd6f1eee76dc9a5f66d3a092e '
  //     )
  //   );
  // console.log(txFrom);

  // const time = await web3.eth.getBlock(14306593).then((obj) => obj.timestamp); // OK
  // console.log(time);
  // 제네시스 블록부터 배열의 0
  return events;
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
