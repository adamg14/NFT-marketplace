const express = require("express");
const ethers = require("ethers");
const fs = require("fs-extra");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const PORT = 4000;

const app = express();
app.use(cors());

async function deploySmartContract(){
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY, provider);
    const abi = fs.readFileSync(path.join(__dirname, "HelloWorld_sol_HelloWorld.abi"), "utf8");
    const binary = fs.readFileSync(path.join(__dirname, "HelloWorld_sol_HelloWorld.bin"), "utf8");
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
    console.log("Deploying the smart contract  to the blockchain...");
    const contract = await contractFactory.deploy();
    await contract.waitForDeployment();
    console.log("Smart contract has been deployed to the blockchain");
    return contract;
}

const abi = fs.readFileSync(path.join(__dirname, "HelloWorld_sol_HelloWorld.abi"), "utf8");
// address of the contract already deployed - so the contract doesnt need to be deployed everytime
const contractAddress = "0x5f359F3d8DCDF9e5c5c49064Dd9c6B684D1A98fc";
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const contract = new ethers.Contract(contractAddress, abi, provider);


async function HelloWorld(){
    const functionResult = await contract.helloworld();
    return functionResult;
}

app.get("/", async function(req, res){
    const result = await HelloWorld();
    console.log(result);
    res.send(result);
})

app.listen(PORT, function(){
    console.log("Server running on PORT " + 4000);
});