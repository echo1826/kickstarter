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

    await factory.methods
        .createCampaign("100")
        .send({ from: accounts[0], gas: "1000000" });

    [campaignAddress] = await factory.methods
        .getCampaigns()
        .call({ from: accounts[0], gas: "1000000" });

    campaign = await new web3.eth.Contract(
        compiledCampaign.abi,
        campaignAddress
    );
});

describe("Campaign Factory", () => {
    it("deploys the factory and campaign", () => {
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    });

    it("marks caller as the campaign manager", async () => {
        const manager = await campaign.methods.manager().call();
        assert.equal(accounts[0], manager);
    });

    it("can contribute to a campaign and marks them as approvers", async () => {
        await campaign.methods.contribute().send({
            from: accounts[1],
            value: "200",
        });

        const approverStatus = await campaign.methods
            .approvers(accounts[1])
            .call();
        assert(approverStatus);
    });

    it("requires a minimum amount of contribution become a contributor", async () => {
        try {
            await campaign.methods.contribute().send({
                from: accounts[1],
                value: "100",
            });
            assert(false);
        } catch (error) {
            assert(error);
        }
    });

    it("allows a manager to make a payment request", async () => {
        await campaign.methods
            .createRequest("Buy batteries", "100", accounts[1])
            .send({
                from: accounts[0],
                gas: "1000000",
            });
        const request = await campaign.methods.requests(0).call();

        assert.equal("Buy batteries", request.description);
    });

    it("processes requests", async () => {
        await campaign.methods.contribute().send({
            from: accounts[0],
            value: web3.utils.toWei("10", "ether"),
        });

        await campaign.methods
            .createRequest("a", web3.utils.toWei("5", "ether"), accounts[1])
            .send({
                from: accounts[0],
                gas: "1000000",
            });

        await campaign.methods
            .approveRequest(0)
            .send({ from: accounts[0], gas: "1000000" });

        await campaign.methods.finalizeRequest(0).send({
            from: accounts[0], 
            gas: "1000000"
        });

        let finalBalance = await web3.eth.getBalance(accounts[1]);

        finalBalance = web3.utils.fromWei(finalBalance, 'ether');
        finalBalance = parseFloat(finalBalance);
        // console.log(finalBalance);

        assert(finalBalance > 104);
    });
});
