// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "./interfaces/IBlacklist.sol";

/// @title Blacklist: a central contract to manage blacklisted addresses
contract Blacklist is IBlacklist, Ownable, AccessControl {
    using EnumerableSet for EnumerableSet.AddressSet;

    /// @notice The set of blacklisted addresses
    EnumerableSet.AddressSet private _blacklist;

    /// @notice The operator role
    bytes32 public constant OPERATOR_ROLE = keccak256("OPERATOR_ROLE");

    /// @notice Emitted when an address is added to the blacklist
    event Added(address indexed account);
    /// @notice Emitted when an address is removed from the blacklist
    event Removed(address indexed account);

    error Unauthorized();

    /**
     * @notice Checks if the caller has the operator role
     */
    modifier onlyOperator() {
        if (!hasRole(OPERATOR_ROLE, msg.sender)) revert Unauthorized();
        _;
    }

    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    /**
     * @notice Returns `true` if the account is blacklisted, or `false` if not
     */
    function isBlacklisted(address account) external view returns (bool) {
        return _blacklist.contains(account);
    }

    /**
     * @notice Returns the list of blacklisted addresses
     */
    function getBlacklist() external view returns (address[] memory) {
        return _blacklist.values();
    }

    /** 
     * @notice Adds an address to the blacklist
     */
    function add(address account) external onlyOperator() {
        _blacklist.add(account);

        emit Added(account);
    }

    /**
     * @notice Removes an address from the blacklist
     */
    function remove(address account) external onlyOperator() {
        _blacklist.remove(account);

        emit Removed(account);
    }
}