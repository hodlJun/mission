import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import Pool from '../components/Pool';
import Transactions from '../components/Transactions';

const Routing = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Pool />} />
        <Route path="txs" element={<Transactions />} />
      </Routes>
    </>
  );
};

export default Routing;

// --------남은사항 ----------
// 개선작업 시작전 데이터 일치하는지 이더스캔이랑 비교
// 예상 reward 값이 해당 트랜잭션이 일어났을때의 reward 값이 아니고
// 모든 트랜잭션들이 다 이루어진 현재 상태의 예상 reward 값을 가지고 와서 의미가 없다.
// 2022. 4. 4.	0x0b1c628e37c24d0ea2ca74e87564241dc7188885	7081.539	3	-	0.010015026731443604
// 위에 Tx 정보같이 소수점 맨마지막이 1정도 차이나는 오차는 있을 수 있다.

// Promise 해체부분 undefined 반환되는거 고칠것
// MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 101 "connect" listeners added. Use emitter.setMaxListeners() to increase limit.

/* PPT 만들때 참고 */
// Add가 Pool 로 표기되고 다른
//web3가 깔려있어야 메타마스크가 인식이 된다.
// web3에서 인식하는것이 있다.
// 예상 reward 값, 각 이벤트당 소요된 가스비
// web3에서 이벤트감지하는 함수 사용하면 알수있다.
// contract abi 에서 148번줄 => add가 Pool로 표기되어 이벤트시에도 Pool로 표기예상
// pool => Add
// deposit => Deposit
// widthdraw => Widthdraw

// APR 연이율
// CAP 가능수량
// reward 예상수익량

// _pid ( pool id )
// amount 입금량
// decimal 소수점

// deposit pool에 입금한다.
// withdraw 출금
// poolinfo 풀정보조회

// reward, amount 는 컨트랙트 userinfo 에 넣으면 조회가능하다.
// 해당 트랜잭션의 pid는 input data에서 조회가능

// 컨트랙트 Add 메소드가 allEvent로 가져오면 Pool 로 표시된다.

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

// 예상 reward는 그 트랜잭션 당시의 reward가 아닌 현재 최신 스냅샷의 예상 reward라서
// 트랜잭션마다 예상 reward를 불러오는건 큰 의미가 없다.
// 여전히 메모리 누수의 경고는 뜬다.
// 예상으로는 decimal 불러오는 부분을 promise로 똑같이 묶어서 실행시키면 될거같다.
// decimal 함수안에 web3.utill 이 여러번 불러져서 그런거같다.

// table class 중복 사용가능성
// 테이블이 pid 밑에 크기로 고정되는 문제
// 출금일자는 해당 pid에서 해당 from 주소의 widthdraw 가 일어난 날짜 <= 결국 추적해야함
