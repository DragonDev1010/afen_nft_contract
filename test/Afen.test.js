require('chai')
    .use(require('chai-as-promised'))
    .should()

const {assert} = require('chai')    

const FakeAfenToken = artifacts.require('./FakeAfenToken.sol')
const Main = artifacts.require('./Main.sol')

// contract('Fake Afen Token test', (accounts) => {
//     let afen
//     before(async() => {
//         afen = await FakeAfenToken.deployed()
//     })
//     it('Deployment test', async() => {
//         const afen_address = afen.address 
//         assert.notEqual(afen_address, '0x0')
//         assert.notEqual(afen_address, '')
//         assert.notEqual(afen_address, null)
//         assert.notEqual(afen_address, undefined)
//     })
//     it('sell', async() => {
//         res = await afen.sell(accounts[0], 1000)
//         assert.equal(res.logs[0].args._to, accounts[0], 'address is correct')
//         assert.equal(res.logs[0].args._balanceOf, 1000, 'amount is correct')
//     })
//     it('transfer', async() => {
//         res = await afen.sell(accounts[0], 2000)
//         res = await afen.transfer(accounts[1], 1000, {from: accounts[0]})
//         assert.equal(res.logs[0].args.from, accounts[0], 'correct from address')
//         assert.equal(res.logs[0].args.balanceFrom, 2000, 'correct from balance')
//         assert.equal(res.logs[0].args.to, accounts[1], 'correct to address')
//         assert.equal(res.logs[0].args.balanceTo, 1000, 'correct to balance')
//     })
// })

contract('Main contract', (accounts) => {
    let afen, main
    let res
    before(async() => {
        afen = await FakeAfenToken.deployed()
        main = await Main.deployed()

        afen.sell(accounts[0], 1000)
        afen.sell(afen.address, 1000)
        afen.sell(main.address, 1000)
    })
    // it('deployment test', async() => {
    //     const afen_addr = afen.address
    //     const main_addr = main.address
    //     assert.notEqual(afen_addr, '0x0')
    //     assert.notEqual(afen_addr, '')
    //     assert.notEqual(afen_addr, undefined)
    //     assert.notEqual(afen_addr, null)

    //     assert.notEqual(main_addr, '0x0')
    //     assert.notEqual(main_addr, '')
    //     assert.notEqual(main_addr, undefined)
    //     assert.notEqual(main_addr, null)
    // })
    // it('mint test', async() => {
    //     res = await main.mint('hash_value_string', 10, 10, 123)
    //     assert.equal(res.logs[1].args._hash, 'hash_value_string')
    //     assert.equal(res.logs[1].args.aprice, 10)
    //     assert.equal(res.logs[1].args.bprice, 10)
    //     assert.equal(res.logs[1].args.amount, 123)
    //     assert.equal(res.logs[1].args.creator, accounts[0])
    //     res = await main.mint('hash_value_string_1', 10, 10, 123)
    //     assert.equal(res.logs[2].args.length, 2)
    // })
    it('set_sell test', async() => {
        res = await afen.sell(accounts[0], 2340)
        res = await main.mint('hash_value_string', 10, 10, 123)
        // res = await afen.balanceOf(accounts[0])
        // console.log(accounts[0])
        // console.log(res)
        res = await main.set_sell(0, 0);
        console.log(res.logs[0].args.bal_f.toString())
        console.log(res.logs[0].args.bal_t.toString())
        // console.log(res.logs[1].args)
    })
})