require('chai')
    .use(require('chai-as-promised'))
    .should()

const {assert} = require('chai')

const Mint = artifacts.require('./Mint.sol')

contract('Mint', (accounts) => {
    let mint
    before(async() => {
        mint = await Mint.deployed()
    })
    describe('deployment', async() => {
        it('deploys successfully', async() => {
            const address = await mint.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })
    })
    describe('functioning test', async() => {
        it('mint_func test', async() => {
            var result = await mint.mint(
                'hash_str_1', 10, 10, 10,
                {from: accounts[0]}    
            )
            // console.log(result)
            const event =  result.logs[1].args
            assert.equal(event._hash, 'hash_str_1', 'minted NFT id is correct')
        })
        it('getnfts_func test', async() => {
            var result = await mint.get_nfts()
            console.log(result)
            assert.equal(result[0]._hash, 'hash_str_1', 'getnfts_func correct')
            
        })
    })
})