// pragma solidity >=0.4.21 <0.6.0;
pragma solidity ^0.5.0;

import "./Token.sol";
contract EthSwap {
    string public name = "EthSwap Instance Exchange";
    Token public token;
    uint public rate = 100;
    event TokenPurchased(
        address account,
        address token ,
        uint amount,
        uint rate
    );
    event TokenSold(
        address account,
        address token ,
        uint amount,
        uint rate
    );

    constructor( Token _token) public{
           token = _token;
    }


function buyTokens () public payable {
    // amount fo eth * redemption
    uint tokenAmount = msg.value *rate ;
    // check if ethswap balance is up to token to be bought
    require(token.balanceOf(address(this))>=tokenAmount);
    token.transfer(msg.sender, tokenAmount);
    emit TokenPurchased(msg.sender,address(token),tokenAmount,rate);
}



function sellTokens (uint256 _amountToBeSold) public  {
    // amount fo eth * redemption
   // uint userBalance = token.balanceOf(msg.sender);
    //require(userBalance>=_amountToBeSold);

    uint tokenAmountInEth = _amountToBeSold / rate  ;

    // check if ethswap balance is up to token to be bought
    // require(token.balanceOf(address(this))>=tokenAmount);
    require((address(this).balance)>=tokenAmountInEth);

    token.transferFrom(msg.sender,address(this), _amountToBeSold);
    msg.sender.transfer(tokenAmountInEth);
    emit TokenSold(msg.sender,address(token),_amountToBeSold,rate);
}
}
