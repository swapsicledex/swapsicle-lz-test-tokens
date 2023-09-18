require("dotenv").config();
require("hardhat-deploy");
require('@nomiclabs/hardhat-truffle5');
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-tracer");
require("hardhat-gas-reporter");
require("./tasks/lz-send");
require("./tasks/lz-remotes");

const DEFAULT_COMPILER_SETTINGS = {
  version: '0.8.19',
  settings: {
    optimizer: {
      enabled: true,
      runs: 500_000, // default = high (prod): 0.5 M runs
    },
  },
}

const {
  PRIVATE_KEY,
  ETHEREUM_API_KEY,
  BSC_API_KEY,
  AVALANCHE_API_KEY,
  POLYGON_API_KEY,
  FANTOM_API_KEY,
  MANTLE_API_KEY,
  INFURA_KEY,
} = process.env;
module.exports = {
  solidity: {
    compilers: [DEFAULT_COMPILER_SETTINGS],
  },
  mocha: {
    timeout: 90000
  },
  gasReporter: {
    currency: 'USD',
    enabled: process.env.REPORT_GAS,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    gasPrice: process.env.GAS_PRICE || 20,
    token: process.env.REPORT_GAS_TOKEN
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    localhost: {
      url: `http://127.0.0.1:8545`
    },
    ethereum: {
      url: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    avalanche: {
      url: "https://api.avax.network/ext/bc/C/rpc",
      chainId: 43114,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    fuji: {
      url: 'https://rpc.ankr.com/avalanche_fuji',
      chainId: 43113,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    bsc: {
      url: `https://bsc-dataseed1.binance.org`,
      chainId: 56,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    bsc_testnet: {
      url: `https://data-seed-prebsc-1-s1.binance.org:8545`,
      chainId: 97,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    telos: {
      url: "https://mainnet.telos.net/evm",
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 40,
    },
    telos_testnet: {
      url: "https://testnet.telos.net/evm",
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 41,
    },
    polygon: {
      url: 'https://polygon-rpc.com',
      chainId: 137,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    mumbai: {
      url: 'https://polygon-testnet.public.blastapi.io',
      chainId: 80001,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    fantom: {
      url: 'https://rpc.ftm.tools',
      chainId: 250,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    fantom_testnet: {
      url: 'https://rpc.ankr.com/fantom_testnet',
      chainId: 4002,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    mantle: {
      url: "https://rpc.mantle.xyz",
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 5000,
    },
    mantle_testnet: {
      url: "https://rpc.testnet.mantle.xyz",
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 5001,
    },
  },
  etherscan: {
    apiKey: {
      avalanche: AVALANCHE_API_KEY,
      mantle: MANTLE_API_KEY,
      mantle_testnet: MANTLE_API_KEY,
    },
    customChains: [
      {
        network: "mantle",
        chainId: 5000,
        urls: {
          apiURL: "https://explorer.mantle.xyz/api",
          browserURL: "https://explorer.mantle.xyz"
        }
      },
      {
        network: "mantle_testnet",
        chainId: 5001,
        urls: {
          apiURL: "https://explorer.testnet.mantle.xyz/api",
          browserURL: "https://explorer.testnet.mantle.xyz"
        }
      }
    ]
  }  
};
