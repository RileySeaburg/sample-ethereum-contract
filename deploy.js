const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const { interface, bytecode} = require('./compile')
const dotenv = require('dotenv')
dotenv.config();
const mnemonic = process.env.MNEMONIC
const rinkeby = process.env.RINKEBY
const provider = new HDWalletProvider( mnemonic,rinkeby)
console.log(mnemonic);
const web3 = new Web3(provider)

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account:', accounts[0])

  const result =   await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments: ['Hi There!']})
    .send({ gas: '1000000', from: accounts[0]})

    console.log('Contract deployed to', result.options.address)
}

deploy()