import React, {useState, useEffect } from "react";
import Axios from "axios";

function CryptoPrice(){
    const [BTCPrice, setBTCPrice] = useState();
    const [ETHPrice, setETHPrice] = useState();
    
    useEffect(() => {
        getCryptoPrice();
    });

    async function getCryptoPrice(){
        const response = (await Axios.get("http://localhost:4000/crypto-price")).data;
        const [responseBTCPrice, responseETHPrice] = response;
        setBTCPrice(responseBTCPrice);
        setETHPrice(responseETHPrice);
    }
    return (
        <div>
            <h1>Current Prices</h1>
            <p>BTC Price: ${ BTCPrice }</p>
            <p>ETH Price: ${ ETHPrice }</p>

        </div>
    );
}

export default CryptoPrice;