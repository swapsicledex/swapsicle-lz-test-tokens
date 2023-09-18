const { ethers, network } = require("hardhat");
const Logger = require('../services/logger');
const { logVerifyCommand, toWei } = require("../services/utils");
const { CHAIN_INFO, LZ_SHARED_DECIMALS } = require("../services/constants");

module.exports = async ({deployments}) => {
  const {deploy} = deployments;
  const [deployer] = await ethers.getSigners();
  const chainId = network.config.chainId;

  Logger.info(`Deploying LzNativeTest to ${network.name}...`);

  const args = [
    toWei(100_000), // 100k
    LZ_SHARED_DECIMALS,
    CHAIN_INFO[chainId].lzEndPointAddress,
  ];
  Logger.info(`Deploying LzNativeTest [${args}]...`);

  const { address } = await deploy('LzNativeTest', {
    from: deployer.address,
    args: args,
    log: true,
  });

  logVerifyCommand("LzNativeTest", address, args);
};

module.exports.tags = ['LzNativeTest'];