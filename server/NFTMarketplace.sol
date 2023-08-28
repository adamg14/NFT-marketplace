// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract NFTMarketplace{
    uint256 private tokenIdGenerator = 0;

    address immutable owner;
    NFT[] public NFTs;

    constructor(){
        owner = msg.sender;
    }

    modifier isOwner{
        require(msg.sender == owner, "Only the owner of the smart contract has access to this functionality");
        _;
    }
    struct NFT{
        uint256 tokenId;
        address NFTOwner;
        string name;
        string description;
        string imageURL;
        // price in wei
        uint256 price;
    }

    // only the owner should be able to do this - add the onlyOwner modifier
    function mintNFT(address payable _NFTOwner, string memory _name, string memory _description, string memory _imageURL, uint256 _price) public isOwner{
        // increment the tokenIdGenerator
        NFT memory mintedNFT = NFT({
            tokenId: tokenIdGenerator,
            NFTOwner: _NFTOwner,
            name: _name,
            description: _description,
            imageURL: _imageURL,
            price: _price
        });
        tokenIdGenerator += 1;
        NFTs.push(mintedNFT);
    }
}