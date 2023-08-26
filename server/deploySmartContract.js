const ethers = require("ethers");
const fs = require("fs-extra");
const path = require("path");
require("dotenv").config();

async function deploySmartContract(){
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY, provider);
    const abi = fs.readFileSync(path.join(__dirname, "HelloWorld_sol_HelloWorld.abi"), "utf8");
    const binary = fs.readFileSync(path.join(__dirname, "HelloWorld_sol_HelloWorld.bin"), "utf8");
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
    console.log("Deploying the smart contract  to the blockchain...");
    const contract = await contractFactory.deploy();
    await contract.waitForDeployment();
    const contractAddress = await contract.getAddress();
    console.log("Smart Contract Address: " + contractAddress);
    console.log("Smart contract has been deployed to the blockchain");
    return contract;
}

deploySmartContract().then(() => {
    process.exit(0);
}).catch((error) => {
    console.log(error);
    process.exit(1);
});