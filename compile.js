const path = require("path");
const fs = require("fs-extra");
const solc = require("solc");

const buildPath = path.resolve(__dirname, "ethereum/build");

fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, "ethereum/contract", "Campaign.sol");
const source = fs.readFileSync(campaignPath, "utf8");

var input = {
    language: "Solidity",
    sources: {
        "Campaign.sol": {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            "*": {
                "*": ["*"],
            },
        },
    },
};

fs.ensureDirSync(buildPath);

const output = JSON.parse(solc.compile(JSON.stringify(input)));
for (let contract in output.contracts["Campaign.sol"]) {
    fs.outputJSONSync(
        path.resolve(buildPath, contract + ".json"),
        output.contracts["Campaign.sol"][contract]
    );
}
