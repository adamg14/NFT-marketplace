import logo from './logo.svg';
import './App.css';
import Heading from "./components/Heading";
import HelloWorldButton from './components/HelloWorldButton';
import SendFunds from './components/SendFunds';
import React, { useState } from 'react';
import axios from "axios";

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
      <Heading></Heading>
      <button onClick={ handleClick }>Hello World - Smart Contract Function</button>
      <p>{ result }</p>
      <SendFunds></SendFunds>
      <img src="https://res-console.cloudinary.com/dewruj06n/thumbnails/v1/image/upload/v1693066311/dm56NGhtb3Y2YmZwZG1oanZtcmk=/preview"></img>
    </div>
  );
}

export default App;
