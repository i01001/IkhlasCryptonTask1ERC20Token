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
        owner_ = msg.sender;  //contract owner
        _symbol = "IKH1";  // symbol for the Token
        _name = "Ikhlas NEW coin";  // Name of the Token
        _decimals = 18;  // Number of decimals for the Token 
        _totalSupply = 1000000*10**18;  // Total Supply at the time of contract creation
        balances[msg.sender] = _totalSupply;  // All tokens are allocated to owner
        emit Transfer(address(0), msg.sender, _totalSupply);  //event to describe transfer of token
    }

// This modifier is to limit certain functions to owner of the contract
    modifier owner{
        require(msg.sender == owner_, "This transaction can only be carried out by owner!");
        _;
    }

// This function displays the name of the token as a return
    function name() public view returns (string memory){
        return _name;
    }

// This function displays the symbol of the token as a return
    function symbol() public view returns (string memory){
        return _symbol;
    }

// This function displays the number of decimals for the token as a return
    function decimals() public view returns (uint8){
        return _decimals;
    }

// This function adds two numbers
    function add(uint a, uint b) public pure returns (uint c) {
        c = a + b;
    }
 
 //This function takes the difference of two numbers
    function sub(uint a, uint b) public pure returns (uint c) {
        require(b <= a);
        c = a - b;
    }

// Events to describe the transfer of token or approval of it 
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);

//This function displays the total supply available for the Token
    function totalSupply() public view returns (uint256) {
        return _totalSupply  - balances[address(0)];
    }
 
 //This function displays the total number of tokens with the specified address
    function balanceOf(address _owner) public view returns (uint256 balance){
        return balances[_owner];
    }
 
 //This function allows user to approve another accout to spend its token upto the specified value
    function approve(address _spender, uint256 _value) public returns (bool success){
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }
 
 //This function is used to transfer tokens from one account or address to another 
    function transfer(address _to, uint256 _value) public returns (bool success){
        balances[msg.sender] = sub(balances[msg.sender], _value);
        balances[_to] = add(balances[_to], _value);
        emit Transfer(msg.sender, _to, _value);
        return true;
    }
 
 //This function is used to transfer funds that have been approved to be transferred 
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        balances[_from] = sub(balances[_from], _value);
        allowed[_from][msg.sender] = sub(allowed[_from][msg.sender], _value);
        balances[_to] = add(balances[_to], _value);
        emit Transfer(_from, _to, _value);
        return true;
    }

//This function is used to check the available limits for the approved function
    function allowance(address _owner, address _spender) public view returns (uint256 remaining){
        return allowed[_owner][_spender];
    }

//This function is used to mint new tokens
    function mint(address _to, uint256 _value) public owner returns(bool success){
        balances[_to] = add(balances[_to], _value);
        _totalSupply = add(_totalSupply, _value);
        emit Transfer(address(0), _to, _value);
        return true;
    }

//This function is used to burn the tokens 
    function burn(address _to, uint256 _value) public owner returns(bool success){
        balances[_to] = sub(balances[_to], _value);
        balances[address(0)] = add(balances[address(0)], _value);
        emit Transfer(_to, address(0), _value);
        return true;
    }
 

}