const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const compiledFactory = require("../ethereum/build/CampaignFactory.json");
const compiledCampaign = require("../ethereum/build/Campaign.json");

// console.log(compiledFactory.evm.bytecode.object);

const web3 = new Web3(ganache.provider());



let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    console.log(accounts[0])

    factory = await new web3.eth.Contract(compiledFactory.abi)
        .deploy({ data: compiledFactory.evm.bytecode.object })
        .send({ from: accounts[0], gas: "1500000" });
});

describe("Campaign Factory", () => {
    it("deploys the factory", () => {
        assert.ok(factory.options.address);
    })
})
