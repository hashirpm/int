const Token = artifacts.require("Token");

const TokenSale = artifacts.require("TokenSale");

module.exports = async function (deployer) {

	var tokenPrice = 1000000000000000;

    
     await deployer.deploy(TokenSale, Token.address, tokenPrice);


};