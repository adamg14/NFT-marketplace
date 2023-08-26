const express = require("express");
const ethers = require("ethers");
const fs = require("fs-extra");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const PORT = 4000;

const app = express();
app.use(cors());


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