// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract HelloWorld{
    function sendFunds(address payable recipient) external payable{
        recipient.transfer(msg.value);
    }
}