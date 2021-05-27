// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
// deployed contract address
// 0xD434fc96112d3dB4B676aFB99b9D67dE73A34638
contract Mint is ERC1155 {
    struct Nft {
        string _hash;
        uint _aprice;
        uint _bprice;
        address _creator;
    }
    Nft[] nft_list;
    event Mint_result(string _hash, uint _aprice, uint _bprice, address _creator);
    constructor () ERC1155("") {}
    function mint(string memory _hash, uint _amount, uint _aprice, uint _bprice) public returns(uint) {
        uint id = nft_list.length;
        _mint(msg.sender, id, _amount, "");
        Nft memory temp = Nft(_hash, _aprice, _bprice, msg.sender);
        nft_list.push(temp);
        emit Mint_result(_hash, _aprice, _bprice, msg.sender);
        return id;
    }
    function get_nfts() public view returns(Nft[] memory) {
        return nft_list;
    }
}
