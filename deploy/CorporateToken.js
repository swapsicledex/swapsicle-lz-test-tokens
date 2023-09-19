const { ethers, network } = require("hardhat");
const Logger = require('../services/logger');
const { toWei, logVerifyCommand } = require("../services/utils");
const { CHAIN_INFO, LZ_SHARED_DECIMALS } = require("../services/constants");

module.exports = async ({deployments}) => {
  const {deploy} = deployments;
  const [deployer] = await ethers.getSigners();
  const chainId = network.config.chainId;

  Logger.info(`Deploying CorporateToken to ${network.name}...`);

  const initialSupply = toWei(10_000_000);

  const args = [
    initialSupply,
    deployer.address,
    LZ_SHARED_DECIMALS,
    CHAIN_INFO[chainId].lzEndPointAddress,
  ];
  Logger.info(`Deploying CorporateToken [${args}]`);

  const { address } = await deploy('CorporateToken', {
    from: deployer.address,
    args: args,
    log: true,
  });

  logVerifyCommand("CorporateToken", address, args);
};

module.exports.tags = ['CorporateToken'];