const ganache = require("ganache-cli");
const Web3 = require("web3");
const { abi, evm } = require("../compile");

const web3 = new Web3(ganache.provider());

let fetchedAccounts;
let campaign;
let minimum = 0.01;

beforeEach(async () => {
  fetchedAccounts = await web3.eth.getAccounts();

  campaign = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object, arguments: [minimum] })
    .send({ from: fetchedAccounts[0], gas: "1000000" });
});

describe('Campaign', () => {
    it('deploys a contract', () => {
        assert.ok(campaign.options.address);
    })
})
