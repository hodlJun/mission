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

// 개선작업 시작전 데이터 일치하는지 이더스캔이랑 비교
// 파라미터는 _넣어주고, redux 써서 arowana decimal 같은건 적용시킬지 정할것
// contract 를 매번 불러올지 아니면 한번 부르고 나머지는 메소드 실행만 하게할지
// async await 줄이기
// => 지금은 매번 getContact 함수를 불러서하는형태임
// useCallback이 정말 필요한곳만 적용하여 코드줄이기
// 코드 개선부분 찾을것
// aync await 이어지는부분이 아닌 개별이면 promise.all 혹은 promise.allsettled 로 묶기
// loading 컴포넌트 추가

// 소요된 가스비는 gas price * used gas 하면된다.
// 얼마를, 몇번 pool 인지 나오지 않으면 보여주지 않고
// 예상 reward 값은 해당 pool 일시만 나온다(pid, amount 이 필요) => userinfo 에서 요청

// txfee 계산 값 불일치 => 해결 // gasUsed * cumulativeGasUsed = tx fee;
//

// 표제목인 caption 태그가 반드시 들어가야 한다.
// th와 td의 방향관계를 알 수 있도록 scope 속성을 제공해줘야 한다.

// --------남은사항 ----------
// 예상 reward 값이 해당 트랜잭션이 일어났을때의 reward 값이 아니고
// 모든 트랜잭션들이 다 이루어진 현재 상태의 예상 reward 값을 가지고 와서 의미가 없다.
// MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 101 "connect" listeners added. Use emitter.setMaxListeners() to increase limit.
