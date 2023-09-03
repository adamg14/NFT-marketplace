import React, { useState } from "react";
import Axios from "axios";
import { ethers } from "ethers";

function MintNFT(){
    const [NFTName, setNFTName] = useState();
    const [NFTDescription, setNFTDescription] = useState();
    const [NFTImageURL, setNFTImageURL] = useState();
    const [NFTPrice, setNFTPrice] = useState();

    function handleNameInput(event){
        setNFTName(event.target.value);
    }

    function handleDescriptionInput(event){
        setNFTDescription(event.target.value);
    }

    function handleImageURLInput(event){
        setNFTImageURL(event.target.value);
    }

    function handleNFTPriceInput(event){
        setNFTPrice(event.target.value);
    }


    async function handleClick(){
        console.log("this should be the description " + NFTDescription);
        if (window.ethereum){
            await window.ethereum.enable();
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const userAddress = await signer.getAddress();
            const contractAddress = "0x616E951440Ad0d2163ca4Bcb76C6418E670b8d51";

            const contractABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"NFTs","outputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"address","name":"NFTOwner","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"description","type":"string"},{"internalType":"string","name":"imageURL","type":"string"},{"internalType":"string","name":"price","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"listedNFTs","outputs":[{"components":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"address","name":"NFTOwner","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"description","type":"string"},{"internalType":"string","name":"imageURL","type":"string"},{"internalType":"string","name":"price","type":"string"}],"internalType":"struct NFTMarketplace.NFT[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address payable","name":"_NFTOwner","type":"address"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_description","type":"string"},{"internalType":"string","name":"_imageURL","type":"string"},{"internalType":"string","name":"_price","type":"string"}],"name":"mintNFT","outputs":[],"stateMutability":"nonpayable","type":"function"}];

            // create an instance of the contract
            const contract = new ethers.Contract(contractAddress, contractABI, signer);

            const transaction = await contract.mintNFT(userAddress, NFTName, NFTDescription, NFTImageURL, NFTPrice);
        }
    }

    return(
        <div>
            <h1>Mint NFT</h1>
            {/* dont need to input the owners address, this will be retrieved from the msg.sender property */}
            <input type="text" value={ NFTName } id="NFTNameInput" name="NFTNameInput" placeholder="Name" onChange={ handleNameInput }/>
            <br />
            <input type="text" value={ NFTDescription } id="NFTDescriptionInput" name="NFTDescriptionInput" placeholder="Description" onChange={ handleDescriptionInput }/>
            <br />
            <input type="text" value={ NFTImageURL } id="NFTImageURLInput" name="NFTDescriptionInput" placeholder="Public Image URL" onChange={ handleImageURLInput }/>
            <br />
            <input type="number" min="1" value={ NFTPrice } id="NFTPriceInput" name="NFTPriceInput" placeholder="Price (Ethers)" onChange={ handleNFTPriceInput }/>
            <br />
            <button onClick={ handleClick }>Mint NFT</button>
        </div>
    );
}

export default MintNFT;