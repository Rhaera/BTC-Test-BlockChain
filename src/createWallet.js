//import dependencies

const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

//setting net
//testnet = test web
//bitcoin = main web

const network = bitcoin.networks.testnet

//setting wallet derivation path - HD sample (0 for main and 1 for test net)

const path = `m/49'/1'/0'/0`

//setting the seed's mnemonic (password)

let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

//creating a wallet HD root

let root = bip32.fromSeed(seed, network)

//creating an account (node) with pvt-pub key pair

let account = root.derivePath(path)
let node = account.derive(0).derive(0)

//creating address

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

//show in screen

console.log("Generated wallet")
console.log("Address: ", btcAddress)
console.log("Private key: ", node.toWIF())
console.log("Seed: ", mnemonic)
