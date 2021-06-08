// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import './FakeAfenToken.sol';
import './FakeBscToken.sol';

contract Main is ERC1155, Ownable{
    struct Nft {
        string _hash;
        uint _aprice;
        uint _bprice;
        uint _amount;
        address _creator;
        address _owner;
        bool _isSell;
    }
    Nft[] nft_list;
    FakeAfenToken afen = new FakeAfenToken();
    FakeBscToken bsc = new FakeBscToken();

    event Minted(string _hash, uint aprice, uint bprice, uint amount, address creator);
    event Minted_nft_len(uint length);
    event SettedSell(uint id, bool isSet, address creator, address setter);

    
    constructor() ERC1155("") Ownable(){
    }

    receive() external payable {}

    event Withdrawed(address withdrawer);
    function withdrawBnb() public payable onlyOwner{
        address payable sender = payable(msg.sender);
        sender.transfer(address(this).balance);
    }
    event WithdrawAfen_Event (address _owner, uint balanceOf);
    function withdrawAfen() public payable onlyOwner {
        uint balance = afen.balanceOf(msg.sender);
        afen.transfer(msg.sender, balance);
        uint new_balance = afen.balanceOf(msg.sender);
        emit WithdrawAfen_Event(msg.sender, new_balance);
    }
    function mint(string memory _hash, uint _aprice, uint _bprice, uint _amount) public {
        uint nft_len = nft_list.length;
        _mint(msg.sender, nft_len, _amount, "");
        Nft memory temp = Nft(_hash, _aprice, _bprice, _amount,msg.sender, msg.sender, false);
        nft_list.push(temp);
        emit Minted(_hash, _aprice, _bprice, _amount, msg.sender);
        emit Minted_nft_len(nft_len+1);
    }

    function get_nft(uint _id) public view returns(string memory, uint, uint, uint, address) {
        return (
            nft_list[_id]._hash,
            nft_list[_id]._aprice,
            nft_list[_id]._bprice,
            nft_list[_id]._amount,
            nft_list[_id]._creator
        );
    }

    function calc_fee(uint _price) public pure returns(uint) {
        return _price*4/100;
    }

    event AfenSold(address to, uint balance_to);
    function afen_sell(address _to, uint _amount) public {
        afen.sell(_to, _amount);
        emit AfenSold(_to, afen.balanceOf(_to));
    }

    event BscSold(address from, uint balance_from, address to, uint balance_to);
    function bsc_sell(address _from, address _to, uint _amount) public {
        bsc.safeTransfer(_from, _to, _amount);
        emit BscSold(_from, afen.balanceOf(_from), _to, afen.balanceOf(_to));
    }

    event SetSold(uint nft_id, bool nft_sell_state, uint balance_contract, uint fee);
    function SetSell(uint _id, uint _token_id) public {
        nft_list[_id]._isSell = true;
        uint sell_fee;
        if(_token_id == 0) {
            sell_fee = calc_fee(nft_list[_id]._aprice);
            afen.safeTransfer(msg.sender, address(this), sell_fee);
        } else {
            sell_fee = calc_fee(nft_list[_id]._bprice);
            bsc_sell(msg.sender, address(this), sell_fee);
        }
        emit SetSold(_id, nft_list[_id]._isSell, afen.balanceOf(address(this)), sell_fee);
    }

    function buy_fee(uint _price) public pure returns(uint) {
        return _price * 7 /100;
    }
    function buy(uint _id, uint _token_id, uint _amount) public {
        nft_list[_id]._isSell = false;
        uint fee;
        if(_token_id == 0) {
            fee = buy_fee(nft_list[_id]._aprice);
            afen.safeTransfer(msg.sender, nft_list[_id]._owner, fee);
        } else {
            fee = buy_fee(nft_list[_id]._bprice);
            afen.safeTransfer(msg.sender, nft_list[_id]._owner, fee);
        }
        nft_list[_id]._owner = msg.sender;
        
    }
}