import React from "react";

function NavigationBar(){
    return(
        <nav className="navbar navbar-expand-lg" style={{backgroundColor: "black"}}>
            <a href="/" className="navbar-brand">Adam's NFT Collection</a>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a href="/">NFT Collection</a>
                    </li>
                    <li className="nav-item active">
                        <a href="/mint-nft">Mint NFT</a>
                    </li>
                    <li className="nav-item active">
                        <a href="/crypto-prices">Crypto Prices</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavigationBar;