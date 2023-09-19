const { ethers, network } = require("hardhat");
const Logger = require('../services/logger');
const { logVerifyCommand, toWei } = require("../services/utils");
const { CHAIN_INFO, LZ_SHARED_DECIMALS } = require("../services/constants");

module.exports = async ({deployments}) => {
  const {deploy} = deployments;
  const [deployer] = await ethers.getSigners();
  const chainId = network.config.chainId;

  Logger.info(`Deploying LzTest2 to ${network.name}...`);

  const args = [
    toWei(10_000), // 10k
    LZ_SHARED_DECIMALS,
    CHAIN_INFO[chainId].lzEndPointAddress,
  ];
  Logger.info(`Deploying LzTest2 [${args}]...`);

  const { address } = await deploy('LzTest2', {
    from: deployer.address,
    args: args,
    log: true,
  });

  logVerifyCommand("LzTest2", address, args);
};

module.exports.tags = ['LzTest2'];