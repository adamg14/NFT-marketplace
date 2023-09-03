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

async function getNFTListings(){
    console.log("this function has been called");
    // create a contract interface
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const contractABI = fs.readFileSync(path.join(__dirname, "NFTMarketplace_sol_NFTMarketplace.abi"), "utf8");
    const contractAddress = "0x616E951440Ad0d2163ca4Bcb76C6418E670b8d51";

    const contract = new ethers.Contract(contractAddress, contractABI, provider);
    const NFTListing = await contract.listedNFTs();
    return NFTListing;
}

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

app.get("/nft-listings", async function(req, res){
    const NFTListingResult = await getNFTListings();

    for(let i = 0; i < NFTListingResult.length; i++){
        NFTListingResult[i].price = NFTListingResult[i].price.toString();
    }

    const jsonString = JSON.stringify(NFTListingResult, function(key, value){
        if (typeof value === 'bigint') {
          return value.toString();
        }else{
            return value;
        }
    });
    res.send(jsonString);
});

app.listen(PORT, function(){
    console.log("Server running on PORT " + 4000);
});