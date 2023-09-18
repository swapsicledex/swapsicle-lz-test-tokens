const { CHAIN_INFO } = require("../services/constants")
const { getContractAddress } = require("../services/utils")
const Logger = require("../services/logger")

const lzRemotes = task('lz-remotes', 'Set OFTV2 token trusted remotes')
  .addPositionalParam('contractName', 'contract name (case sensitive)')
  .setAction(async (args) => {
    const contractName = args.contractName
    const chainId = network.config.chainId
    const contract = await ethers.getContract(contractName)
    Logger.info(`Setting ${contractName} trusted remotes on ${network.name} (${contract.address})`)
  
    const info = CHAIN_INFO[chainId]
    for (let i = 0; i < info.remoteNetworks.length; i++) {
      const networkName = CHAIN_INFO[chainId].remoteNetworks[i]
      const lzChainId = CHAIN_INFO[chainId].remoteLzChainIds[i]
      const contractAddress = getContractAddress(networkName, contractName)
      Logger.info(`${networkName}: ${contractName}.setTrustedRemoteAddress(${lzChainId}, ${contractAddress})`)
      await (await contract.setTrustedRemoteAddress(lzChainId, contractAddress)).wait()
    }
  })

module.exports = {
  lzSend: lzRemotes,
}