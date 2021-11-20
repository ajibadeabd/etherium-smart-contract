const { assert } = require('chai');

const EthSwap = artifacts.require("EthSwap");
const Token = artifacts.require("Token");

require('chai')
  .use(require("chai-as-promised"))
  .should()

contract("EthSwap deployment",(accounts)=>{

    describe('EthSwap deployment', async ()=>{
       it("contract has a name",async()=>{
           let ethSwap =await EthSwap.new()
           const name =await  ethSwap.name()
           console.log(name)
           assert.equal(name, "EthSwap Instance Exchange")
       })
    })
})