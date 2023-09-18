// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@layerzerolabs/solidity-examples/contracts/token/oft/v2/NativeOFTV2.sol";

contract LzNativeTest is Ownable, NativeOFTV2 {

    constructor(uint256 supply_, uint8 sharedDecimals_, address lzEndpoint_) NativeOFTV2("LzNative Test", "LZNT", sharedDecimals_, lzEndpoint_) {
        _mint(msg.sender, supply_);
    }

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    function burn(address account, uint256 amount) external {
        require(account == msg.sender || msg.sender == owner(), "UNAUTHORIZED");
        _burn(account, amount);
    }
}
