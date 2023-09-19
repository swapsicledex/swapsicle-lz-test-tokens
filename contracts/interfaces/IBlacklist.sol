// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IBlacklist {
    function isBlacklisted(address account) external view returns (bool);
    function getBlacklist() external view returns (address[] memory);
    function add(address account) external;
    function remove(address account) external;
}