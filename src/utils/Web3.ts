import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { Contract } from 'web3-eth-contract';
import PoolContractABI from './abi/PoolContract.json';
import ArowanaABI from './abi/ArowanaContract.json';

export const getWeb3 = () => {
  return new Web3((window as any).ethereum);
};

export const getContract = (_contractName = 'main') => {
  const web3 = getWeb3();
  let ContractABI = PoolContractABI as unknown as AbiItem;
  let Address = process.env.REACT_APP_MAINNET_POOL_CONTRACT_ADDRESS;

  if (_contractName === 'arowana') {
    ContractABI = ArowanaABI as unknown as AbiItem;
    Address = process.env.REACT_APP_MAINNET_AROWANA_CONTRACT_ADDRESS;
  }

  const contract = new web3.eth.Contract(
    ContractABI as unknown as AbiItem,
    Address
  );

  return contract;
};

export const getPoolLength = (_contract: Contract) => {
  return _contract.methods.poolLength().call();
};

export const getPoolInfo = (_contract: Contract, _number: number) => {
  const obj = _contract.methods.poolInfo(_number).call();
  return obj;
};

export const arowanaDecimal = () => {
  const contract = getContract('arowana');
  const result = contract.methods.decimals().call();
  return result;
};

export const decimal = (_wei: any, _decimal: number = 18) => {
  const web3 = getWeb3();
  if (+_decimal === 18 && _wei !== undefined) {
    const result = web3.utils.fromWei(_wei.toString(), 'ether');
    return result;
  }
};
