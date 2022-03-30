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
  const contract = getContract();
  const events = await contract.getPastEvents('allEvents', {
    fromBlock: 'genesis',
    toBlock: 'latest',
  });
  console.log(events);

  return events;
};
