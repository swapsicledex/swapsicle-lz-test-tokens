const { ethers, network } = require("hardhat");
const Logger = require('../services/logger');
const { logVerifyCommand, toWei } = require("../services/utils");
const { CHAIN_INFO, LZ_SHARED_DECIMALS } = require("../services/constants");

module.exports = async ({deployments}) => {
  const {deploy} = deployments;
  const [deployer] = await ethers.getSigners();
  const chainId = network.config.chainId;

  Logger.info(`Deploying LzTest to ${network.name}...`);

  const args = [
    toWei(100_000), // 100k
    LZ_SHARED_DECIMALS,
    CHAIN_INFO[chainId].lzEndPointAddress,
  ];
  Logger.info(`Deploying LzTest [${args}]...`);

  const { address } = await deploy('LzTest', {
    from: deployer.address,
    args: args,
    log: true,
  });

  logVerifyCommand("LzTest", address, args);
};

module.exports.tags = ['LzTest'];