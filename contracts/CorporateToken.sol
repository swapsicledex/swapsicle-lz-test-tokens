// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./BlacklistableOFT.sol";

/// @title Corporate Token
contract CorporateToken is BlacklistableOFT {
  /// @notice Treasury address
  address public treasuryAddress;

  error ZeroAddress();

  /**
   * @notice Initializes CT token
   * @param initialSupply_ The initial amount of CT to mint to `treasuryAddress`
   * @param treasuryAddress_ The `treasuryAddress`
   */
  constructor(
    uint256 initialSupply_,
    address treasuryAddress_,
    uint8 sharedDecimals_,
    address lzEndpoint_
  ) BlacklistableOFT("Corporate Token", "CT", sharedDecimals_, lzEndpoint_) {
    if (treasuryAddress_ == address(0) || lzEndpoint_ == address(0)) revert ZeroAddress();

    treasuryAddress = treasuryAddress_;
    _mint(treasuryAddress, initialSupply_);
  }

  /**
   * @notice Mints CT to the treasury address
   * @param amount The amount of CT to mint
   */
  function mint(uint256 amount) external onlyOwner {
    _mint(treasuryAddress, amount);
  }

  /**
   * @notice Burns CT
   * @param amount The amount of CT to burn
   */
  function burn(uint256 amount) external {
    _burn(msg.sender, amount);
  }

  /**
   * @dev Updates `treasuryAddress`
   * @param treasuryAddress_ The new treasury address
   */
  function updateTreasuryAddress(address treasuryAddress_) external onlyOwner {
    if (treasuryAddress_ == address(0)) revert ZeroAddress();
    treasuryAddress = treasuryAddress_;
  }
}