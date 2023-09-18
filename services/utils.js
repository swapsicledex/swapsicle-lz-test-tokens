const fs = require("fs");
const Logger = require("./logger");

const DEFAULT_SLEEP_INTERVAL = 3000; // default sleep interval of 3 seconds

const sleep = (ms) => {
  let sleepInterval = ms || DEFAULT_SLEEP_INTERVAL;
  return new Promise(resolve => setTimeout(resolve, sleepInterval));
}

const getTime = () => {
  return ethers.BigNumber.from(Math.floor(new Date().getTime() / 1000));
}

function round(number, precision = 1e6) {
  return Math.round(number / precision) *  precision;
}

function roundEth(number, precision = 0.1) {
  let intNumber = parseInt(ethers.utils.formatEther(number));
  return Math.round(intNumber / precision) *  precision;
}

function roundDownBigNumber(input, precision) {
  let nrOfDigits = input.toString().length;
  return input.toString().slice(0, precision).padEnd(nrOfDigits, '0'); // e.g. 99996 + zeroes
}

function toETH(number) {
  return ethers.utils.formatEther(number.toString())
}

function toWei(number) {
  return ethers.utils.parseEther(number.toString())
}

function logVerifyCommand(contractName, address, args) {
  Logger.info(`${contractName}: ${address.toLowerCase()}`);
  Logger.info(`${contractName}: npx hardhat verify --network $NETWORK ${address} ${args.join(" ")}`);
}

function getContractAddress(networkName, contractName) {
  const filePath = `deployments/${networkName}/${contractName}.json`;

  try {
    // Read and parse the JSON file
    const contractData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    // Extract the contract address
    const contractAddress = contractData.address;

    return contractAddress;
  } catch (error) {
    console.error(`Error reading contract address for ${contractName} on ${networkName}:`, error);
    throw error;
  }
}

module.exports = {
  sleep,
  getTime,
  round,
  roundEth,
  roundDownBigNumber,
  toETH,
  toWei,
  logVerifyCommand,
  getContractAddress,
}