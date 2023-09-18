const CHAIN_INFO = {
  40: {
    name: "Telos",
    lzChainId: "TODO",
    lzEndPointAddress: "TODO",
    remoteNetworks: ["mantle"],
    remoteChainIds: ["5000"],
    remoteLzChainIds: ["181"],
  },
  41: {
    name: "Telos Testnet",
    lzChainId: "10199",
    lzEndPointAddress: "0x83c73Da98cf733B03315aFa8758834b36a195b87",
    remoteNetworks: ["mantle_testnet", "fuji"],
    remoteChainIds: ["5001", "43113"],
    remoteLzChainIds: ["10181", "10106"],
  },
  5000: {
    name: "Mantle",
    lzChainId: "181",
    lzEndPointAddress: "0xb6319cC6c8c27A8F5dAF0dD3DF91EA35C4720dd7",
    remoteNetworks: ["avalanche", "fantom"],
    remoteChainIds: ["43114", "250"],
    remoteLzChainIds: ["106", "112"],
  },
  5001: {
    name: "Mantle Testnet",
    lzChainId: "10181",
    lzEndPointAddress: "0x2cA20802fd1Fd9649bA8Aa7E50F0C82b479f35fe",
    remoteNetworks: ["telos_testnet", "fuji"],
    remoteChainIds: ["41", "43113"],
    remoteLzChainIds: ["10199", "10106"],
  },
  43113: {
    name: "Avalanche Fuji",
    lzChainId: "10106",
    lzEndPointAddress: "0x93f54D755A063cE7bB9e6Ac47Eccc8e33411d706",
    remoteNetworks: ["telos_testnet", "mantle_testnet"],
    remoteChainIds: ["41", "5001"],
    remoteLzChainIds: ["10199", "10181"],
  },
  43114: {
    name: "Avalanche",
    lzChainId: "106",
    lzEndPointAddress: "0x3c2269811836af69497E5F486A85D7316753cf62",
    remoteNetworks: ["fantom", "mantle"],
    remoteChainIds: ["250", "5000"],
    remoteLzChainIds: ["112", "181"],
  },
  250: {
    name: "Fantom",
    lzChainId: "112",
    lzEndPointAddress: "0xb6319cC6c8c27A8F5dAF0dD3DF91EA35C4720dd7",
    remoteNetworks: ["avalanche", "mantle"],
    remoteChainIds: ["43114", "5000"],
    remoteLzChainIds: ["106", "181"],
  },
  undefined: {
    name: "Hardhat Localhost",
    lzChainId: "10000",
    lzEndPointAddress: "0x93f54D755A063cE7bB9e6Ac47Eccc8e33411d706",
    remoteNetworks: ["telos", "mantle"],
    remoteChainIds: ["555", "777"],
    remoteLzChainIds: ["10555", "10777"],
  },
}

LZ_SHARED_DECIMALS = 6;

module.exports = {
  CHAIN_INFO,
  LZ_SHARED_DECIMALS,
}