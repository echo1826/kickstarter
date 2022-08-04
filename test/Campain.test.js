const ganache = require("ganache-cli");
const assert = require("assert");
const Web3 = require("web3");
const { abi, evm } = require("../compile");

const web3 = new Web3(ganache.provider());

let fetchedAccounts;
let campaign;
let minimum = 100;

beforeEach(async () => {
    fetchedAccounts = await web3.eth.getAccounts();

    campaign = await new web3.eth.Contract(abi)
        .deploy({ data: evm.bytecode.object, arguments: [minimum] })
        .send({ from: fetchedAccounts[0], gas: "1000000" });

});

describe("Campaign", () => {
    it("deploys a contract", () => {
        assert.ok(campaign.options.address);
    });

    it("lets a user contribute to campaign", async () => {
        await campaign.methods.contribute().send({
            from: fetchedAccounts[0],
            value: 100
        });

        const approvers = await campaign.methods.getApprovers().call({
            from: fetchedAccounts[0]
        });

        assert.equal(fetchedAccounts[0], approvers[0]);
    });
});
