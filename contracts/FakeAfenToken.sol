// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FakeAfenToken {
    uint _total;
    mapping(address => uint) _balances;

    event Sold(address _to, uint _balanceOf);
    event Transfered(address from, uint balanceFrom, address to, uint balanceTo);
    constructor() {
        _total = 100000;
        _balances[address(0)] = _total;
    }

    function sell(address _to, uint _amount) public {
        _balances[address(0)] -= _amount;
        _balances[_to] += _amount;
        emit Sold(_to, _balances[_to]);
    }

    function transfer(address _to, uint _amount) public {
        _balances[msg.sender] -= _amount;
        _balances[_to] += _amount;
        emit Transfered(msg.sender, _balances[msg.sender], _to, _balances[_to]);
    }
    function safeTransfer(address _from, address _to, uint _amount) public {
        _balances[_from] -= _amount;
        _balances[_to] += _amount;
        emit Transfered(_from, _balances[_from], _to, _balances[_to]);
    }
    function balanceOf(address _addr) public view returns (uint) {
        return _balances[_addr];
    }
}