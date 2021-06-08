// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import './FakeAfenToken.sol';
import './FakeBscToken.sol';

contract Afen is ERC1155, Ownable {
    
    FakeAfenToken afen = new FakeAfenToken();
    FakeBscToken bsc = new FakeBscToken();
    FakeAfenToken public deployed_afen;
    constructor() ERC1155("") Ownable() {}

    event GetDeployedAfen(address addr);
    function GetDeployed(address afen_addr) public {
        deployed_afen = FakeAfenToken(afen_addr);
        emit GetDeployedAfen(address(deployed_afen));
    }
    struct Nft {
        string _hash;
        address creator;
        uint total;
        uint sellable_amount;
        uint a_price;
        uint b_price;
    }
    Nft[] nft_list; // nft_id ==> _hash, creator, amount

    struct SellNft {
        uint nft_id;
        address owner;
        uint amount;
        bool primary_sell; // True   False
    }
    SellNft[] sell_list; // sell_id ==> nft_id, owner, amount
    // nft_id ==> sell_list id array
    // e.x. : nftid_sellids[0] = [1,3,8]
    mapping(uint => uint[]) nftid_sellids; 
    // address ==> sell_list id array
    // e.x.: owner_sellids['0x123123....'] = [4,1,5,6]
    mapping(address => uint[]) owner_sellids;
    // Sold list : sold_id => nft_id, owner, amount
    struct SoldNft {
        uint nft_id;
        address owner;
        uint amount;
    }
    SoldNft[] sold_list; 
    // nft_id => sold_list id array
    // e.x. nftid_soldids[4] = [1,4,5,6]
    mapping (uint => uint[]) nftid_soldids;
    // address ==> sold_list id array
    // e.x. owner_soldids['0x1231231'] = [3,2,4,3]
    mapping(address => uint[]) owner_soldids;

    // Resell list : resell_id => nft_id, owner, amount
    struct ResellNft {
        uint nft_id;
        address owner;
        uint amount;
    }
    ResellNft[] resell_list;
    // nft_id => sold_list id array
    // e.x. nftid_resellids[4] = [1,4,5,6]
    mapping (uint => uint[]) nftid_resellids;
    // address ==> sold_list id array
    // e.x. owner_resellids['0x1231231'] = [3,2,4,3]
    mapping(address => uint[]) owner_resellids;
    
    event Minted(uint nft_id, string _hash, address creator, uint total, uint sellable_amount, uint a_price, uint b_price);
    function mint(string memory _hash, uint total, uint a_price, uint b_price) public {
        Nft memory temp = Nft(_hash, msg.sender, total, total, a_price, b_price);
        nft_list.push(temp);
        uint new_id = nft_list.length - 1;
        emit Minted(new_id, nft_list[new_id]._hash, nft_list[new_id].creator, nft_list[new_id].total, nft_list[new_id].sellable_amount, nft_list[new_id].a_price, nft_list[new_id].b_price);
    }
    event NftSize(uint size);
    function get_nft_size() public {
        emit NftSize(nft_list.length);
    }
    event GotNft(uint nft_id, string _hash, address creator, uint total, uint sellable_amount);
    function get_nft(uint nft_id) public {
        emit GotNft(nft_id, nft_list[nft_id]._hash, nft_list[nft_id].creator, nft_list[nft_id].total, nft_list[nft_id].sellable_amount);
    }
    event AfenAddr(address afen_addr);
    function get_afen_address() public {
        emit AfenAddr(address(afen));
    }
    function list_fee(uint price) public pure returns(uint) {
        return price * 4 / 100;
    }
    mapping(uint => mapping(address => bool)) nftid_addr_setsell;
    function set_sell(uint nft_id, uint amount, uint token_kind) public {
        // nft_list ==> sell_list
        require(nft_id < nft_list.length, "nft id has to be less than nft list size");
        require(msg.sender == nft_list[nft_id].creator, "only creator can set as sell");
        require(amount < nft_list[nft_id].sellable_amount, "sell amount has to be less than nft sellable amount");
        
        // if nft_id not yet set as sell
        if (nftid_sellids[nft_id].length == 0) {
            SellNft memory temp = SellNft(nft_id, msg.sender, amount, true);
            sell_list.push(temp);
            uint l = sell_list.length - 1;
            nftid_sellids[nft_id].push(l);
            uint fee;
            if(token_kind == 0) {
                fee = list_fee(nft_list[nft_id].a_price);
                require(deployed_afen.balanceOf(msg.sender) > fee, "msg.sender afen balance has to be greater than setting fee");
                deployed_afen.safeTransfer(msg.sender, address(this), fee);
            } else {
                fee = list_fee(nft_list[nft_id].b_price);
                require(bsc.balanceOf(msg.sender) > fee, "msg.sender bsc balance has to be greater than setting fee");
                bsc.safeTransfer(msg.sender, address(this), fee);
            }
        } else {
            sell_list[nftid_sellids[nft_id][0]].amount += amount;
        }
        nft_list[nft_id].sellable_amount -= amount;
    }
    event nftid_sellid(uint ids);
    function get_nftids_sellids(uint nft_id) public {
        emit nftid_sellid(nftid_sellids[nft_id][0]);
    }
    event SellSize(uint length);
    function get_sell_size() public {
        emit SellSize(sell_list.length);
    }
    event SellNftItem(uint sell_id, uint nft_id, address owner, uint amount, bool primary_sell);
    function get_sell_item(uint sell_id) public {
        require(sell_id < sell_list.length, "id has to be less than sell_list size");
        emit SellNftItem(sell_id, sell_list[sell_id].nft_id, sell_list[sell_id].owner, sell_list[sell_id].amount, sell_list[sell_id].primary_sell);
    }
    
    function buy(uint sell_id, uint amount) public {
        require(sell_id < sell_list.length, "sell_id has to be less than sell_list size");
        require(amount < sell_list[sell_id].amount, "amount has to be less than enable sell nft capacity");
        sell_list[sell_id].amount -= amount;
        SoldNft memory temp = SoldNft(sell_list[sell_id].nft_id, msg.sender, amount);
        sold_list.push(temp);
    }
    event SoldNftSize (uint size);
    function get_sold_size() public {
        emit SoldNftSize(sold_list.length);
    }
    event SoldNftItem(uint sold_id, uint nft_id, address owner, uint amount);
    function get_sold_nft(uint sold_id) public {
        emit SoldNftItem(sold_id, sold_list[sold_id].nft_id, sold_list[sold_id].owner, sold_list[sold_id].amount);
    }
    function set_resell(uint sold_id, uint amount) public {
        require(msg.sender == sold_list[sold_id].owner, "only owner can set resell");
        require(amount <=  sold_list[sold_id].amount, "resell nft amount has to be less than sold nft amount");
        SellNft memory temp = SellNft(sold_list[sold_id].nft_id, msg.sender, amount, false);
        sell_list.push(temp);
        sold_list[sold_id].amount -= amount;
    }
}