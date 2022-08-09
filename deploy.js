// deploy code will go here
require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./ethereum/build/CampaignFactory.json');

const api = `https://rinkeby.infura.io/v3/${process.env.API_KEY}`;

// for(let i = 0; i < abi.length; i++) {
//     console.log(abi[i])
// }

const provider = new HDWalletProvider(
    process.env.MNEMONIC,
    api
);
// console.log(provider);
const web3 = new Web3(provider);

async function deploy() {
    const accounts = await web3.eth.getAccounts();
    console.log("Attempting to deploy from account", accounts[0]);

    const result = await new web3.eth.Contract(compiledFactory.abi).deploy({data: compiledFactory.evm.bytecode.object}).send({from: accounts[0], gas: '1500000'});

    // console.log(abi);
    console.log("contract deployed to", result.options.address);
    provider.engine.stop();
}

deploy();