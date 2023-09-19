// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./interfaces/IBlacklist.sol";

/**
 * @title Blacklistable
 * @notice Token that can stop transfers to and from blacklisted addresses.
 * The blacklist is managed in a centralized smart contract.
 * `setBlacklistAddress` sets the address of the blacklist smart contract.
 * `setUseBlacklist` determines whether the blacklist must be used or not.
 */
contract Blacklistable is Ownable, ERC20 {
    address public blacklistAddress;

    /// @notice Whether the blacklist is used or not
    bool public useBlacklist;

    error Blacklisted();

    constructor(string memory name_, string memory symbol_) ERC20(name_, symbol_) {}

    /**
    * @notice Sets whether the blacklist is used or not
    */
    function setUseBlacklist(bool value) external onlyOwner {
        useBlacklist = value;
    }

    /**
    * @notice Sets the blacklist (centralized smart contract) address
    */
    function setBlacklistAddress(address _blacklistAddress) external onlyOwner {
        blacklistAddress = _blacklistAddress;
    }

    /**
    * @dev If the use of blacklist is enabled, forbid transfers from and to blacklisted addresses
    * You can override this, add your logic and call this via `super._beforeTokenTransfer(from, to, 0);`
    */
    function _beforeTokenTransfer(address from, address to, uint256 /*amount*/) internal view virtual override {
        if (!useBlacklist) return;

        address[] memory blacklist = IBlacklist(blacklistAddress).getBlacklist();
        for (uint256 i = 0; i < blacklist.length; i++) {
            if (from == blacklist[i] || to == blacklist[i]) revert Blacklisted();
        }
    }
}