require('chai')
    .use(require('chai-as-promised'))
    .should()

const {assert} = require('chai')    

const FakeAfenToken = artifacts.require('./FakeAfenToken.sol')
const FakeBscToken = artifacts.require('./FakeBscToken.sol')
const Afen = artifacts.require('./Afen_nft.sol')

contract('ERC1155 token test', (accounts) => {
    let afen_nft
    let a_tk, b_tk
    let res
    before(async() => {
        afen_nft = await Afen.deployed()
        a_tk = await FakeAfenToken.deployed()
        b_tk = await FakeBscToken.deployed()
    })
    it('mint() method test', async() =>{
        await afen_nft.mint('hash string 1', 100, 100, 100)
        res = afen_nft.balanceOf(accounts[0], 0)
        console.log(res)
    })
})

// contract('Afen Contract Test', (accounts) => {
//     let main, afen, bnb
//     let res
//     let afen_wallet, main_wallet
//     before(async() => {
//         afen = await FakeAfenToken.deployed()
//         bsc = await FakeBscToken.deployed()
//         main = await Afen.deployed()
//         // console.log('deployed afen address:', deployed_afen)
//         // afen_wallet = await main.get_afen_address()
//         // console.log('contract afen address : ', afen_wallet.logs[0].args.afen_addr.toString())
//         // console.log('console afen address:', afen.address)
//     })
//     // it('CallDeployedAfen() method test', async() => {
//     //     res = await main.CallDeployedAfen(afen.address)
//     //     let deployed_afen = res.logs[0].args.addr
//     //     assert.equal(deployed_afen, afen.address, "deployed afen address is correct")
//     // })
//     // it('CallDeployedBsc() method test', async() => {
//     //     res = await main.CallDeployedBsc(bsc.address)
//     //     let deployed_bsc = res.logs[0].args.addr
//     //     assert.equal(deployed_bsc, bsc.address, "deployed bsc address is correct")
//     // })
//     it('mint() method test', async() => {
//         res = await main.mint('hash_string_0', 100, 100, 100, {from: accounts[0]})
//         assert.equal(res.logs[0].args.nft_id, 0, "nft id is correct")
//         assert.equal(res.logs[0].args._hash, 'hash_string_0', "hash string correct")
//         assert.equal(res.logs[0].args.creator, accounts[0], "nft creator is correct")
//         assert.equal(res.logs[0].args.total, 100, "nft total is correct")
//         assert.equal(res.logs[0].args.sellable_amount, 100, "nft sellable amount is correct")
        
//         res = await main.mint('hash_string_1', 200, 200, 200, {from: accounts[1]})
//         assert.equal(res.logs[0].args.nft_id, 1, "nft id is correct")
//         assert.equal(res.logs[0].args._hash, 'hash_string_1', "hash string correct")
//         assert.equal(res.logs[0].args.creator, accounts[1], "nft creator is correct")
//         assert.equal(res.logs[0].args.total, 200, "nft total is correct")
//         assert.equal(res.logs[0].args.sellable_amount, 200, "nft sellable amount is correct")

//         res = await main.mint('hash_string_2', 300, 300, 300, {from: accounts[2]})
//         assert.equal(res.logs[0].args.nft_id, 2, "nft id is correct")
//         assert.equal(res.logs[0].args._hash, 'hash_string_2', "hash string correct")
//         assert.equal(res.logs[0].args.creator, accounts[2], "nft creator is correct")
//         assert.equal(res.logs[0].args.total, 300, "nft total is correct")
//         assert.equal(res.logs[0].args.sellable_amount, 300, "nft sellable amount is correct")
//     })
//     it('get_nft_size() method test', async() => {
//         res = await main.get_nft_size()
//         assert.equal(res.logs[0].args.size, 3, 'minted nft amount is correct')
//     })
//     it('get_nft() method test', async() => {
//         res = await main.get_nft(0)
//         assert.equal(res.logs[0].args.nft_id, 0, "nft id is correct")
//         assert.equal(res.logs[0].args._hash, 'hash_string_0', 'hash value is correct')
//         assert.equal(res.logs[0].args.creator, accounts[0], 'nft creator is correct')
//         assert.equal(res.logs[0].args.total, 100, 'nft total is correct')
//         assert.equal(res.logs[0].args.sellable_amount, 100, 'nft sellable amount is correct')
//     })
//     it('set_sell() method test', async() => {
//         await afen.sell(accounts[0], 1000)
//         await main.set_sell(0, 30, 0)
//         res = await main.get_sell_item(0)
//         assert.equal(res.logs[0].args.sell_id, 0, "sell list id is correct")
//         assert.equal(res.logs[0].args.nft_id, 0, "nft id is correct")
//         assert.equal(res.logs[0].args.owner, accounts[0], "sell nft owner is correct")
//         assert.equal(res.logs[0].args.amount, 30, "sell nft amount is correct")
//         res = await main.get_sell_size()
//         assert.equal(res.logs[0].args.length, 1, 'sell list size is correct')
//         res = await main.get_nft(0)
//         assert.equal(res.logs[0].args.total, 100, "nft total is correct")
//         assert.equal(res.logs[0].args.sellable_amount, 70, "nft sellable amount is correct")

//         await afen.sell(accounts[1], 1000)
//         await main.set_sell(1, 50, 0, {from: accounts[1]})
//         res = 
//         res = await main.get_sell_item(1)
//         assert.equal(res.logs[0].args.sell_id, 1, "sell list id is correct")
//         assert.equal(res.logs[0].args.nft_id, 1, "nft id is correct")
//         assert.equal(res.logs[0].args.owner, accounts[1], "sell nft owner is correct")
//         assert.equal(res.logs[0].args.amount, 50, "sell nft amount is correct")
//         res = await main.get_sell_size()
//         assert.equal(res.logs[0].args.length, 2, "sell list size is correct")
//         res = await main.get_nft(1)
//         assert.equal(res.logs[0].args.total, 200, "nft total is correct")
//         assert.equal(res.logs[0].args.sellable_amount, 150, "nft sellable amount is correct")

//         await main.set_sell(0, 50, 0)
//         res = await main.get_sell_item(0)
//         assert.equal(res.logs[0].args.sell_id, 0, "sell list id is correct")
//         assert.equal(res.logs[0].args.nft_id, 0, "nft id is correct")
//         assert.equal(res.logs[0].args.owner, accounts[0], "sell nft owner is correct")
//         assert.equal(res.logs[0].args.amount, 80, "sell nft amount is correct")
//         res = await main.get_sell_size()
//         assert.equal(res.logs[0].args.length, 2, "sell list size is correct")
//         res = await main.get_nft(0)
//         assert.equal(res.logs[0].args.total, 100, "nft total is correct")
//         assert.equal(res.logs[0].args.sellable_amount, 20, "nft sellable amount is correct")
//     })
//     it('get_sell_item() method test', async() => {
//         res = await main.get_sell_item(0)
//         assert.equal(res.logs[0].args.sell_id, 0, "sell list id is correct")
//         assert.equal(res.logs[0].args.nft_id, 0, "nft id is correct")
//         assert.equal(res.logs[0].args.owner, accounts[0], "sell nft owner is correct")
//         assert.equal(res.logs[0].args.amount, 80, "sell nft amount is correct")
//     })
//     it('buy() method test', async() => {
//         await afen.sell(accounts[5], 1000)
//         await main.buy(0, 35, 0, {from: accounts[5]})
//         res = await main.get_sell_item(0)
//         assert.equal(res.logs[0].args.sell_id, 0, "sell list id is correct")
//         assert.equal(res.logs[0].args.nft_id, 0, "nft id is correct")
//         assert.equal(res.logs[0].args.owner, accounts[0], "sell nft owner is correct")
//         assert.equal(res.logs[0].args.amount, 45, "sell nft amount is correct")

//         res = await main.get_sold_nft(0)
//         assert.equal(res.logs[0].args.nft_id, 0, "nft id is correct")
//         assert.equal(res.logs[0].args.owner, accounts[5], "sold nft owner is correct")
//         assert.equal(res.logs[0].args.amount, 35, "sold nft amount is correct")
//     })
//     it('get_nftids_sellids() method test', async() => {
        
//         res = await main.get_nftids_sellids(0)
//         assert.equal(res.logs[0].args.ids, 0, "sell list id is correact")
//         res = await main.get_nftids_sellids(1)
//         assert.equal(res.logs[0].args.ids, 1, "sell list id is correact")
//     })
    
//     it('set_resell() method test', async() => {
//         await afen.sell(accounts[4], 1000)
//         await main.buy(1, 10, 0, {from: accounts[4]})
//         await main.set_resell(0, 10, {from: accounts[5]})     
//         res = await main.get_sell_item(2)       
//         assert.equal(res.logs[0].args.sell_id, 2, "sell id of nft is correct")
//         assert.equal(res.logs[0].args.nft_id, 0, "nft id is correct")
//         assert.equal(res.logs[0].args.owner, accounts[5], "owner of resell nft is correct")
//         assert.equal(res.logs[0].args.amount, 10, "amount of resell nft is correct")
//         assert.equal(res.logs[0].args.primary_sell, false, "primary sell of resell nft is set as false")
        
//         await main.set_resell(1, 5, {from:accounts[4]})
//         res = await main.get_sell_item(3)
//         assert.equal(res.logs[0].args.sell_id, 3, "sell id of nft is correct")
//         assert.equal(res.logs[0].args.nft_id, 1, "nft id is correct")
//         assert.equal(res.logs[0].args.owner, accounts[4], "owner of resell nft is correct")
//         assert.equal(res.logs[0].args.amount, 5, "amount of resell nft is correct")
//         assert.equal(res.logs[0].args.primary_sell, false, "primary sell of resell nft is set as false")
//     })
//     it('get_sold_size() method test', async() => {
//         res = await main.get_sold_size()
//         assert.equal(res.logs[0].args.size, 2, "the size of sold list is correct")
//     })

// })