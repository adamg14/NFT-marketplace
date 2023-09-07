import React, { useEffect, useState } from "react";
import Axios from "axios";
import { ethers } from "ethers";

function NFTListings(){
    
    const [currentNFTListings, setCurrentNFTListings] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:4000/nft-listings").then(function(postRequestResult){
            setCurrentNFTListings(postRequestResult.data);

        });
    });

    async function handleButtonClick(event){
        // cast the response from the smart contract to type string
        const NFTString = String(event.target.value);
        // convert the string to a JS array
        const NFTArray = NFTString.split(",");
        console.log("this should be the NFT javascript array " + NFTArray);
        
        // the 6th element in the price to be paid for the NFT
        const NFTPrice = NFTArray[5];

        const valueInWei = ethers.parseUnits(NFTPrice, "ether");

        if (window.ethereum){
            await window.ethereum.enable();
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const userAddress = await signer.getAddress();
            const contractAddress = "0x616E951440Ad0d2163ca4Bcb76C6418E670b8d51";
            const contractABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"NFTs","outputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"address","name":"NFTOwner","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"description","type":"string"},{"internalType":"string","name":"imageURL","type":"string"},{"internalType":"string","name":"price","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"buyNFT","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"listedNFTs","outputs":[{"components":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"address","name":"NFTOwner","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"description","type":"string"},{"internalType":"string","name":"imageURL","type":"string"},{"internalType":"string","name":"price","type":"string"}],"internalType":"struct NFTMarketplace.NFT[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address payable","name":"_NFTOwner","type":"address"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_description","type":"string"},{"internalType":"string","name":"_imageURL","type":"string"},{"internalType":"string","name":"_price","type":"string"}],"name":"mintNFT","outputs":[],"stateMutability":"nonpayable","type":"function"}];

            // create an instance of the contract
            const contract = new ethers.Contract(contractAddress, contractABI, signer);

            const transaction = await contract.buyNFT(event.target.value[0], {value: valueInWei});
        }        
    }
    return(
        <div>
            <h1>NFT Listings</h1>
            {
                currentNFTListings.map((NFT, index) => (
                    <div key={index}>
                        {/*  first element = tokenid, second element = owner address, third element = name, fourth element = description, fifth = image, 6th = price wei*/}
                        <h3>{ NFT[2] }</h3>
                        <p>NFTID: { NFT[0] } </p>
                        <p>Current Owner ETH Address: { NFT[1] }</p>
                        <img src={ NFT[4] } alt="" width="100" height="100"/>
                        <p>Description: { NFT[3] }</p>
                        <button value={NFT} onClick={ handleButtonClick } className="btn btn-success nft-button">Purchase NFT for { NFT[5] } ETH </button>
                        <hr />
                    </div>
                ))
            }
        </div>
    )
}

export default NFTListings;