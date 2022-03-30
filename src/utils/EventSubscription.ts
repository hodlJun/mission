import { getWeb3 } from './Web3';
import { Contract } from 'web3-eth-contract';

// stakePool 컨트렉트 이벤트 감지 함수
// export const eventSubscription = async () => {
//   try {
//     const web3 = new Web3((window as any).ethereum);
//     const chainId = await web3.eth.getChainId();
//     let latest_block = await web3.eth.getBlockNumber();
//     let historical_block = latest_block - 10000;
//     console.log(
//       'latest: ',
//       latest_block,
//       'historical block: ',
//       historical_block
//     );

//     let events = await (
//       getContract(chainId, ContractAddress.stakePool) as Contract
//     ).getPastEvents(
//       'allEvents', // change if your looking for a different event
//       { fromBlock: historical_block, toBlock: 'latest' }
//     );
//     console.log('events : ', events);
//   } catch (error: any) {
//     console.error(error.message);
//     return error.message;
//   }
// };
