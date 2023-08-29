import React, { useEffect, useState } from "react";
import Axios from "axios";

function NFTListings(){
    
    const [currentNFTListings, setCurrentNFTListings] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:4000/nft-listings").then(function(postRequestResult){
            setCurrentNFTListings(postRequestResult.data);

        });
    });
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
                        <button>Purchase NFT for { NFT[5] } Wei </button>
                        <hr />
                    </div>
                ))
            }
        </div>
    )
}

export default NFTListings;