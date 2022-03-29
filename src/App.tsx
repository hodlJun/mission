import React from 'react';
import Web3 from 'web3';

function App() {
  const web3 = new Web3((window as any).ethereum);
  console.log(web3);
  return <div>Test</div>;
}

export default App;
