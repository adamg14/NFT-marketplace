const express = require("express");
const ethers = require("ethers");
const fs = require("fs-extra");
const path = require("path");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");

require("dotenv").config();

const PORT = 4000;

const app = express();
app.use(cors());

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/", async function(req, res){
//     const result = await HelloWorld();
//     console.log(result);
//     res.send(result);
// });

app.get("/crypto-price", async function(req, res){
    const response = await axios.get("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest", {
        headers: {
        'X-CMC_PRO_API_KEY': process.env.COIN_MARKET_CAP_API_KEY
        },
        params: {
            start: 1,
            limit: 2
            }
    });
    const priceData = response.data.data;
    const BTCPrice = priceData[0].quote.USD.price;
    const ETHPrice = priceData[1].quote.USD.price;
    res.send([BTCPrice, ETHPrice]);
});

app.post("/mint-nft", function(req, res){
    console.log("hello world");
    console.log(req.body);
});

app.listen(PORT, function(){
    console.log("Server running on PORT " + 4000);
});