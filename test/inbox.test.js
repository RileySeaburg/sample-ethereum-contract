const assert = require('assert')
// Local test network
const ganache = require('ganache-cli')
// Declare web3 as a constructor.
const Web3 = require('web3');
const web3 = new Web3(ganache.provider())
const { interface, bytecode } = require('../compile')
let accounts

let inbox

beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts()
    // Every function iis async (returns a promise)

    // Use one of those accounts to deploy a contract

    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi there!'] })
        .send({ from: accounts[0], gas: '1000000' })
})


describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address)
    });

    it('has a default message', async () => {
        const message = await inbox.methods.message().call()
        assert.strictEqual(message, 'Hi there!')
    })

    it('can change the message', async () => {
        // send transaction to network
        await inbox.methods.setMessage('bye').send({
            from: accounts[0]
        })
        const message = await inbox.methods.message().call()
        assert.strictEqual(message, 'bye')
    })
})