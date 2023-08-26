import React from "react";
import { ethers } from "ethers";
import ContractABI from "../../../server/HelloWorld_sol_HelloWorld.abi";
import ContractBINARY from "../../../server/HelloWorld_sol_HelloWorld.bin"


function SendFunds(){

    async function handleClick(){
        if (window.ethereum){
            await window.ethereum.enable();
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const userAddress = await signer.getAddress();
            const contractADDRESS = "0x06D16D6D35CbF2F3cDFe013eDF88A1593C7E4E7e";

            // create a contract instance
            const contract = new ethers.Contract(contractABI, contractBINARY, signer);
            const transaction = await contract.SendFunds("0xf39Be453d8b009818e4687DCD35377d3fd7A5f69", {value: "50000000000000000"});
            console.log("Transaction: " + transaction);
        }
    }
    return (
        <div>
            <h1>Send Funds</h1>
            <button onClick={ handleClick }>Click here to send funds</button>
        </div>
    );
}

export default SendFunds;