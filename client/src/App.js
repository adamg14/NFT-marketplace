import logo from './logo.svg';
import './App.css';
import NavigationBar from './components/NavigationBar';
import CryptoPrice from './components/CryptoPrice';
import SendFunds from './components/SendFunds';
import MintNFT from './components/MintNFT';
import React, { useState } from 'react';
import axios from "axios";
import NFTListings from './components/NFTListings';
import { Route, Routes } from "react-router-dom";

function App() {
  const [result, setResult] = useState();

  async function handleClick(){
    console.log("hello world");
    const smartContractResult = await axios.get("http://localhost:4000/");
    console.log(smartContractResult.data);
    setResult(smartContractResult.data);
  }

  return (
    <div className="App">
      <NavigationBar></NavigationBar>

      <Routes>
        <Route path="/" element={<NFTListings></NFTListings>}></Route>
        <Route path="/mint-nft" element={<MintNFT></MintNFT>}></Route>
        <Route path="/crypto-prices" element={<CryptoPrice></CryptoPrice>}></Route>
      </Routes>
    </div>
  );
}

export default App;
