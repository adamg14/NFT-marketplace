import React, { useState } from "react";
import Axios from "axios";
import { ethers } from "ethers";

function MintNFT(){
    let NFTNameInput;
    let NFTDescriptionInput;
    let NFTImageURLInput;
    let NFTPriceInput;

    async function handleClick(){
        if (window.ethereum){
            await window.ethereum.enable();
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const userAddress = await signer.getAddress();
            const contractAddress = "0xe2aC15B10DDa50675dA6B3fA7DEbB05164c92838";

            const contractABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"NFTs","outputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"address","name":"NFTOwner","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"description","type":"string"},{"internalType":"string","name":"imageURL","type":"string"},{"internalType":"uint256","name":"price","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address payable","name":"_NFTOwner","type":"address"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_description","type":"string"},{"internalType":"string","name":"_imageURL","type":"string"},{"internalType":"uint256","name":"_price","type":"uint256"}],"name":"mintNFT","outputs":[],"stateMutability":"nonpayable","type":"function"}];

            // create an instance of the contract
            const contract = new ethers.Contract(contractAddress, contractABI, signer);

            const transaction = await contract.mintNFT(userAddress, "W11", "Trip to London.", "https://res-console.cloudinary.com/dewruj06n/thumbnails/v1/image/upload/v1693066311/dm56NGhtb3Y2YmZwZG1oanZtcmk=/preview", "500000000000000000");
        }
    }

    return(
        <div>
            <h1>Mint NFT</h1>
            {/* dont need to input the owners address, this will be retrieved from the msg.sender property */}
            <input type="text" value={ NFTNameInput } id="NFTNameInput" name="NFTNameInput" placeholder="Name"/>
            <br />
            <input type="text" value={ NFTDescriptionInput } id="NFTDescriptionInput" name="NFTDescriptionInput" placeholder="Description"/>
            <br />
            <input type="text" value={ NFTImageURLInput } id="NFTImageURLInput" name="NFTDescriptionInput" placeholder="Public Image URL"/>
            <br />
            <input type="number" min="1" value={ NFTPriceInput } id="NFTPriceInput" name="NFTPriceInput" placeholder="Price (Ethers)"/>
            <br />
            <button onClick={ handleClick }>Mint NFT</button>
        </div>
    );
}

export default MintNFT;