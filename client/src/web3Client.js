import React from 'react';
import Web3 from 'web3';
import Greeting from "./contracts/Greeting.json";

 const  web3Client=async()=> {

    const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
    
 
    const response = await web3.eth.greetingContract.methods.setName("Prasad");
 
    console.log(response);

  return <div></div>;
}


export default web3Client;