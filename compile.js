const fs = require('fs-extra');
const path = require('path');
const solc = require('solc');

const campaignPath = path.resolve(__dirname, 'contract', 'Campaign.sol');

const source = fs.readFileSync(campaignPath, 'utf8');

const buildPath = path.resolve(__dirname, "build");


fs.removeSync(buildPath);




const input = {
    language: 'Solidity',
    sources: {
        'Campaign.sol': {
            content: source
        }
    },
    settings: {
        outputSelection: {
            "*": {
                '*': ['abi', 'evm.bytecode']
            }
        }
    }
}

const output = JSON.parse(solc.compile(JSON.stringify(input)));

fs.ensureDirSync(buildPath);

if(output.errors) {
    output.errors.forEach((err) => {
        console.log(err.formattedMessage);
    })
}

const contracts = output.contracts["Campaign.sol"];

// console.log(contracts);

for(let contractName in contracts) {
    const contract = contracts[contractName];
    fs.writeFileSync(path.resolve(__dirname, buildPath, `${contractName}.json`), JSON.stringify(contract.abi, null, 2), 'utf8');
}


// module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Campaign.sol'].Campaign;