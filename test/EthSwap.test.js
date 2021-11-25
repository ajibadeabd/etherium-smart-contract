const { assert } = require('chai');
// const { default: Web3 } = require('web3');

const Token = artifacts.require("Token");
const EthSwap = artifacts.require("EthSwap");


require('chai')
  .use(require("chai-as-promised"))
  .should()
function tokens(n){
return web3.utils.toWei(n,'ether')
}
contract("EthSwap deployment",([deployer,investor])=>{
    let token, ethSwap, defaulteBalance;
    before(async()=>{
         token = await Token.new();
         ethSwap = await EthSwap.new(token.address);
         defaulteBalance = tokens("1000000");
        await token.transfer(ethSwap.address, defaulteBalance);

    })
describe("EthSwap deployment", async () => {
  it("contract has a name", async () => {
    const name = await ethSwap.name();
    console.log(name);
    assert.equal(name, "EthSwap Instance Exchange");
  });
});
describe("token  deployment", async () => {
  it("token has a name", async () => {
    const name = await token.name();
    console.log(name);
    assert.equal(name, "DApp Token");
  });
});
describe("contract has token", async () => {
  it("token has a name", async () => {
  const balanOfContract = await token.balanceOf(ethSwap.address);
    assert.equal(balanOfContract, defaulteBalance);
  });
});

describe("buyToken()", async () => {
    let result
    before(async () => {
        // buy token with 1 eth
  result =await ethSwap.buyTokens({ from: investor, value: web3.utils.toWei("1", "Ether")})
});
it("Allows user to purchase token at a fixed price", async () => {
  let investorBalance = await token.balanceOf(investor);
  assert.equal(investorBalance, tokens("100"));

  let ethSwapBalance = await token.balanceOf(ethSwap.address);
  assert.equal(ethSwapBalance, tokens("999900"));
// console.log(ethSwapBalance.toString());

   ethSwapBalance = await web3.eth.getBalance(ethSwap.address);
// console.log(ethSwapBalance);

  assert.equal(ethSwapBalance, web3.utils.toWei("1","Ether"));
  const event = result.logs[0].args
  assert.equal(event.account,investor)
  assert.equal(event.token,token.address)
  assert.equal(event.rate.toString(),'100')
  assert.equal(event.amount.toString(),tokens('100'))
});

});
describe("sellToken()", async () => {
    let result 
    before(async () => {
        await token.approve(ethSwap.address,tokens('100'),{from: investor});
        result = await ethSwap.sellTokens(tokens("100"), {from: investor});
});

  it("Allow user to sell tokens to ethswap for a fixed price", async () => {
//     // const balanOfContract = await token.balanceOf(ethSwap.address);
//     // assert.equal(balanOfContract, defaulteBalance);
const investorBalance = await token.balanceOf((investor));
assert.equal(investorBalance.toString(),tokens('0'))


let ethSwapBalance = await token.balanceOf(ethSwap.address);
assert.equal(ethSwapBalance, tokens("1000000"));
// console.log(ethSwapBalance.toString());

ethSwapBalance = await web3.eth.getBalance(ethSwap.address);
// console.log(ethSwapBalance);

assert.equal(ethSwapBalance, tokens("0"));
const event = result.logs[0].args;
assert.equal(event.account, investor);
assert.equal(event.token, token.address);
assert.equal(event.rate.toString(), "100");
assert.equal(event.amount.toString(), tokens("100"));

// assert.equal(ethSwapBalance, web3.utils.toWei("01", "Ether"));
// return web3.utils.toWei(n, "ether");

// console.log(result.logs);
// console.log(token.address);

  });
});


})
