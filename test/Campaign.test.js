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

    factory = await new web3.eth.Contract(compiledFactory.abi)
        .deploy({ data: compiledFactory.evm.bytecode.object })
        .send({ from: accounts[0], gas: "1500000" });

    await factory.methods.createCampaign('100').send({from: accounts[0], gas: "1000000"});

    [campaignAddress] = await factory.methods.getCampaigns().call({from: accounts[0], gas: "1000000"});

    campaign = await new web3.eth.Contract(compiledCampaign.abi, campaignAddress);
});

describe("Campaign Factory", () => {
    it("deploys the factory and campaign", () => {
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    });

    it("")
})
