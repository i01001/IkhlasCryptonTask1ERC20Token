//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract IkhlasToken {
    string public _symbol;
    string public _name;
    uint8 public _decimals;
    uint _totalSupply;
    address public owner_;
 
    mapping(address => uint) public balances;
    mapping(address => mapping(address => uint)) allowed;
 
    constructor() {
        owner_ = msg.sender;
        _symbol = "IKH1";
        _name = "Ikhlas NEW coin";
        _decimals = 18;
        _totalSupply = 1000000*10**18;
        balances[msg.sender] = _totalSupply;
        emit Transfer(address(0), msg.sender, _totalSupply);
    }

    modifier owner{
        require(msg.sender == owner_, "This transaction can only be carried out by owner!");
        _;
    }

    function name() public view returns (string memory){
        return _name;
    }

    function symbol() public view returns (string memory){
        return _symbol;
    }

    function decimals() public view returns (uint8){
        return _decimals;
    }

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);

    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }
 
    function balanceOf(address _owner) public view returns (uint256 balance){
        return balances[_owner];
    }
 
    function approve(address _spender, uint256 _value) public returns (bool success){
        require(balances[msg.sender] >= _value);
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }
 
    function transfer(address _to, uint256 _value) public returns (bool success){
        require(balances[msg.sender] >= _value);
        balances[msg.sender] = balances[msg.sender] - _value;
        balances[_to] = balances[_to] + _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }
 
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(balances[_from] >= _value);
        balances[_from] = balances[_from] - _value;
        allowed[_from][msg.sender] = (allowed[_from][msg.sender] - _value);
        balances[_to] = (balances[_to] + _value);
        emit Transfer(_from, _to, _value);
        return true;
    }

    function allowance(address _owner, address _spender) public view returns (uint256 remaining){
        return allowed[_owner][_spender];
    }

    function mint(address _to, uint256 _value) public owner returns(bool success){
        balances[_to] = (balances[_to] + _value);
        _totalSupply = (_totalSupply + _value);
        emit Transfer(address(0), _to, _value);
        return true;
    }

    function burn(address _to, uint256 _value) public owner returns(bool success){
        require(balances[_to] >= _value);
        balances[_to] = (balances[_to] - _value);
        _totalSupply = (_totalSupply - _value);
        emit Transfer(_to, address(0), _value);
        return true;
    }
}
