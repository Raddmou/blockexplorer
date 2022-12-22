import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [currentBlock, setCurrentBlock] = useState();

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }
    

    getBlockNumber();
  });

  async function getBlock() {
    console.log("blockNumber", blockNumber);
    const response = await alchemy.core.getBlock(blockNumber);
    console.log("getBlock", response);
    setCurrentBlock(response);
  }

  return <div>
        <div className="App">
          <button onClick={getBlock}>Block Number: {blockNumber} </button>
          <div>
            <div className="App">Block nonce: {currentBlock?.nonce}</div>
            <div className="App">Block hash: {currentBlock?.hash}</div>
            <div className="App">Block number: {currentBlock?.number}</div>
            <div className="App">Block parentHash: {currentBlock?.parentHash}</div>
            <div className="App">Block transactions count: {currentBlock?.transactions?.length}</div>
          </div>
        </div>
    </div>;
}

export default App;
