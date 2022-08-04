import Web3 from 'web3';
// requesting the current account that's signed into metamask extension
window.ethereum.request({method: 'eth_requestAccounts'});

// creating a new web3 instance with the current account signed in
const web3 = new Web3(window.ethereum);

export default web3;