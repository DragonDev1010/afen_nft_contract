require('chai')
    .use(require('chai-as-promised'))
    .should()

const {assert} = require('chai')    

const FakeAfenToken = artifacts.require('./FakeAfenToken.sol')
const Main = artifacts.require('./Main.sol')
const Afen = artifacts.require('./Afen.sol')

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

// contract('Main contract', (accounts) => {
//     let afen, main
//     let res
//     before(async() => {
//         afen = await FakeAfenToken.deployed()
//         main = await Main.deployed()

//         afen.sell(accounts[0], 1000)
//         afen.sell(afen.address, 1000)
//         afen.sell(main.address, 1000)
//     })
//     it('deployment test', async() => {
//         const afen_addr = afen.address
//         const main_addr = main.address
//         assert.notEqual(afen_addr, '0x0')
//         assert.notEqual(afen_addr, '')
//         assert.notEqual(afen_addr, undefined)
//         assert.notEqual(afen_addr, null)

//         assert.notEqual(main_addr, '0x0')
//         assert.notEqual(main_addr, '')
//         assert.notEqual(main_addr, undefined)
//         assert.notEqual(main_addr, null)
//     })
//     it('mint test', async() => {
//         res = await main.mint('hash_value_string', 100, 100, 123)
//         assert.equal(res.logs[1].args._hash, 'hash_value_string')
//         assert.equal(res.logs[1].args.aprice, 100)
//         assert.equal(res.logs[1].args.bprice, 100)
//         assert.equal(res.logs[1].args.amount, 123)
//         assert.equal(res.logs[1].args.creator, accounts[0])
//         res = await main.mint('hash_value_string_1', 100, 100, 123)
//         assert.equal(res.logs[2].args.length, 2)
//     })
//     it('set_sell test', async() => {
//         res = await main.afen_sell(accounts[0], 1234)
//         res = await main.mint('nft_hash_string_1', 100, 100, 50)
//         res = await main.SetSell(0,0)
//         assert.equal(res.logs[0].args.nft_id, 0, 'selected nft id is correct')
//         assert.equal(res.logs[0].args.nft_sell_state, true, 'selected nft is defiend sell-enable')
//         assert.equal(res.logs[0].args.balance_contract, 4, 'selling fee is transfered correctly')
//         assert.equal(res.logs[0].args.fee, 4, 'selling fee is calculated correctly')

//     })
//     it('withdraw test', async() => {
//         res = await afen.sell(accounts[0], 1000)
//         res = await main.mint('hash_value_string', 100, 100, 100)
//         res = await main.set_sell(0, 0)
//         res = await main.withdrawAfen()
//         console.log(res.logs[0].args)
//     })
// })
contract('Afen Contract Test', (accounts) => {
    let main, afen, bnb
    let res
    before(async() => {
        main = await Afen.deployed()
        afen = await FakeAfenToken.deployed()
    })
    it('mint() method test', async() => {
        res = await main.mint('hash_string_0', 100, {from: accounts[0]})
        assert.equal(res.logs[0].args.nft_id, 0, "nft id is correct")
        assert.equal(res.logs[0].args._hash, 'hash_string_0', "hash string correct")
        assert.equal(res.logs[0].args.creator, accounts[0], "nft creator is correct")
        assert.equal(res.logs[0].args.total, 100, "nft total is correct")
        assert.equal(res.logs[0].args.sellable_amount, 100, "nft sellable amount is correct")
        
        res = await main.mint('hash_string_1', 200, {from: accounts[1]})
        assert.equal(res.logs[0].args.nft_id, 1, "nft id is correct")
        assert.equal(res.logs[0].args._hash, 'hash_string_1', "hash string correct")
        assert.equal(res.logs[0].args.creator, accounts[1], "nft creator is correct")
        assert.equal(res.logs[0].args.total, 200, "nft total is correct")
        assert.equal(res.logs[0].args.sellable_amount, 200, "nft sellable amount is correct")

        res = await main.mint('hash_string_2', 300, {from: accounts[2]})
        assert.equal(res.logs[0].args.nft_id, 2, "nft id is correct")
        assert.equal(res.logs[0].args._hash, 'hash_string_2', "hash string correct")
        assert.equal(res.logs[0].args.creator, accounts[2], "nft creator is correct")
        assert.equal(res.logs[0].args.total, 300, "nft total is correct")
        assert.equal(res.logs[0].args.sellable_amount, 300, "nft sellable amount is correct")
    })
    it('get_nft_size() method test', async() => {
        res = await main.get_nft_size()
        assert.equal(res.logs[0].args.size, 3, 'minted nft amount is correct')
    })
    it('get_nft() method test', async() => {
        res = await main.get_nft(0)
        assert.equal(res.logs[0].args.nft_id, 0, "nft id is correct")
        assert.equal(res.logs[0].args._hash, 'hash_string_0', 'hash value is correct')
        assert.equal(res.logs[0].args.creator, accounts[0], 'nft creator is correct')
        assert.equal(res.logs[0].args.total, 100, 'nft total is correct')
        assert.equal(res.logs[0].args.sellable_amount, 100, 'nft sellable amount is correct')
    })
    it('set_sell() method test', async() => {
        await main.set_sell(0, 30)
        res = await main.get_sell_item(0)
        assert.equal(res.logs[0].args.sell_id, 0, "sell list id is correct")
        assert.equal(res.logs[0].args.nft_id, 0, "nft id is correct")
        assert.equal(res.logs[0].args.owner, accounts[0], "sell nft owner is correct")
        assert.equal(res.logs[0].args.amount, 30, "sell nft amount is correct")
        res = await main.get_sell_size()
        assert.equal(res.logs[0].args.length, 1, 'sell list size is correct')
        res = await main.get_nft(0)
        assert.equal(res.logs[0].args.total, 100, "nft total is correct")
        assert.equal(res.logs[0].args.sellable_amount, 70, "nft sellable amount is correct")

        await main.set_sell(1, 50, {from: accounts[1]})
        res = await main.get_sell_item(1)
        assert.equal(res.logs[0].args.sell_id, 1, "sell list id is correct")
        assert.equal(res.logs[0].args.nft_id, 1, "nft id is correct")
        assert.equal(res.logs[0].args.owner, accounts[1], "sell nft owner is correct")
        assert.equal(res.logs[0].args.amount, 50, "sell nft amount is correct")
        res = await main.get_sell_size()
        assert.equal(res.logs[0].args.length, 2, "sell list size is correct")
        res = await main.get_nft(1)
        assert.equal(res.logs[0].args.total, 200, "nft total is correct")
        assert.equal(res.logs[0].args.sellable_amount, 150, "nft sellable amount is correct")

        await main.set_sell(0, 50)
        res = await main.get_sell_item(0)
        assert.equal(res.logs[0].args.sell_id, 0, "sell list id is correct")
        assert.equal(res.logs[0].args.nft_id, 0, "nft id is correct")
        assert.equal(res.logs[0].args.owner, accounts[0], "sell nft owner is correct")
        assert.equal(res.logs[0].args.amount, 80, "sell nft amount is correct")
        res = await main.get_sell_size()
        assert.equal(res.logs[0].args.length, 2, "sell list size is correct")
        res = await main.get_nft(0)
        assert.equal(res.logs[0].args.total, 100, "nft total is correct")
        assert.equal(res.logs[0].args.sellable_amount, 20, "nft sellable amount is correct")
    })
    it('get_sell_item() method test', async() => {
        res = await main.get_sell_item(0)
        assert.equal(res.logs[0].args.sell_id, 0, "sell list id is correct")
        assert.equal(res.logs[0].args.nft_id, 0, "nft id is correct")
        assert.equal(res.logs[0].args.owner, accounts[0], "sell nft owner is correct")
        assert.equal(res.logs[0].args.amount, 80, "sell nft amount is correct")
    })
    it('buy() method test', async() => {
        await main.buy(0, 35, {from: accounts[5]})
        res = await main.get_sell_item(0)
        assert.equal(res.logs[0].args.sell_id, 0, "sell list id is correct")
        assert.equal(res.logs[0].args.nft_id, 0, "nft id is correct")
        assert.equal(res.logs[0].args.owner, accounts[0], "sell nft owner is correct")
        assert.equal(res.logs[0].args.amount, 45, "sell nft amount is correct")

        res = await main.get_sold_nft(0)
        assert.equal(res.logs[0].args.nft_id, 0, "nft id is correct")
        assert.equal(res.logs[0].args.owner, accounts[5], "sold nft owner is correct")
        assert.equal(res.logs[0].args.amount, 35, "sold nft amount is correct")
    })
    it('get_nftids_sellids() method test', async() => {
        
        res = await main.get_nftids_sellids(0)
        assert.equal(res.logs[0].args.ids, 0, "sell list id is correact")
        res = await main.get_nftids_sellids(1)
        assert.equal(res.logs[0].args.ids, 1, "sell list id is correact")
    })
    
    it('set_resell() method test', async() => {
        await main.buy(1, 10, {from: accounts[4]})
        await main.set_resell(0, 10, {from: accounts[5]})     
        res = await main.get_sell_item(2)       
        assert.equal(res.logs[0].args.sell_id, 2, "sell id of nft is correct")
        assert.equal(res.logs[0].args.nft_id, 0, "nft id is correct")
        assert.equal(res.logs[0].args.owner, accounts[5], "owner of resell nft is correct")
        assert.equal(res.logs[0].args.amount, 10, "amount of resell nft is correct")
        assert.equal(res.logs[0].args.primary_sell, false, "primary sell of resell nft is set as false")
        
        await main.set_resell(1, 5, {from:accounts[4]})
        res = await main.get_sell_item(3)
        assert.equal(res.logs[0].args.sell_id, 3, "sell id of nft is correct")
        assert.equal(res.logs[0].args.nft_id, 1, "nft id is correct")
        assert.equal(res.logs[0].args.owner, accounts[4], "owner of resell nft is correct")
        assert.equal(res.logs[0].args.amount, 5, "amount of resell nft is correct")
        assert.equal(res.logs[0].args.primary_sell, false, "primary sell of resell nft is set as false")
    })
    it('get_sold_size() method test', async() => {
        res = await main.get_sold_size()
        assert.equal(res.logs[0].args.size, 2, "the size of sold list is correct")
    })

})