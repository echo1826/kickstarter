const fs = require('fs');
const path = require('path');
const solc = require('solc');

const campaignPath = path.resolve(__dirname, 'contract', 'Campaign.sol');

const source = fs.readFileSync(campaignPath, 'utf8');

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
                '*': ['*']
            }
        }
    }
}

// console.log(JSON.parse(solc.compile(JSON.stringify(input))).contracts['Campaign.sol'].Campaign);

module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Campaign.sol'].Campaign;