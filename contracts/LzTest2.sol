// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./layerzero/oftv2/OFTV2.sol";

contract LzTest2 is Ownable, OFTV2 {

    error Unauthorized();

    constructor(uint256 supply_, uint8 sharedDecimals_, address lzEndpoint_) OFTV2("Lz 2", "Lz2", sharedDecimals_, lzEndpoint_) {
        _mint(msg.sender, supply_);
    }

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    function burn(address account, uint256 amount) external {
        if (!(account == msg.sender || msg.sender == owner())) revert Unauthorized();
        _burn(account, amount);
    }
}
