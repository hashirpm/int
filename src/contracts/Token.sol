// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Capped.sol";

contract Token is ERC20, ERC20Capped {
    address public minter;

    event MinterChanged(address indexed from, address to);

    constructor()
        public
        payable
        ERC20("Interest", "INT")
        ERC20Capped(1000000000 * (10**uint256(18)))
    {
        minter = msg.sender;
    }

    function passMinterRole(address dBank) public returns (bool) {
        require(
            msg.sender == minter,
            "Error, only owner can change pass minter role"
        );
        minter = dBank;

        emit MinterChanged(msg.sender, dBank);
        return true;
    }

    function mint(address account, uint256 amount) public {
        require(
            msg.sender == minter,
            "Error, msg.sender does not have minter role"
        );
        _mint(account, amount);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override(ERC20, ERC20Capped) {
        super._beforeTokenTransfer(from, to, amount);
    }
}
