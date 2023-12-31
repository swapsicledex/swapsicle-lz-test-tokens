const { toWei, toETH } = require("../services/utils")
const { CHAIN_INFO } = require("../services/constants")
const Logger = require("../services/logger")
const { BigNumber } = require("ethers")

const lzSend = task('lz-send', 'Bridge token via LayerZero')
  .addPositionalParam('amount', 'amount human readable (ETH)')
  .addPositionalParam('contractName', 'contract name')
  .addPositionalParam('networkName', 'the network name as in hardhat.config.js')
  .addOptionalParam('recipient', 'address to send to')
  .addOptionalParam('gas', 'Gas used in the adapterParams (default 200000)')
  .addOptionalParam('debug', 'Debug')
  .setAction(async (args) => {
    const [owner] = await ethers.getSigners()
    const contractName = args.contractName
    let token = await ethers.getContract(contractName)
    let toAddress = owner.address
    if (args.recipient) {
      toAddress = args.recipient
      console.log(`Recipient set to: ${toAddress}`)
    }
    let amount = toWei(args.amount)
    let toAddressBytes = ethers.utils.defaultAbiCoder.encode(['address'],[toAddress])
    let remoteChainId = config.networks[args.networkName].chainId
    let lzChainId = CHAIN_INFO[remoteChainId].lzChainId
    let gas = parseInt(args.gas) || 200000
    let adapterParams = ethers.utils.solidityPack(["uint16", "uint256"], [1, gas])

    if (args.debug) console.log(`Sending to ${args.networkName} = chainId ${remoteChainId} => lzChainId ${lzChainId}`)
    let recipientArg = args.recipient ? ` --recipient ${args.recipient}` : ""
    Logger.info(`npx hardhat --network ${network.name} lz-send ${args.amount} ${contractName} ${args.networkName}${recipientArg}`)
    
    let sendFromParams = [
      owner.address,
      lzChainId,
      toAddressBytes,
      amount,
      [owner.address, ethers.constants.AddressZero, "0x"],
    ]
    try {
      let fees = await token.estimateSendFee(lzChainId, toAddressBytes, amount, false, adapterParams)
      let fee = fees[0]
      Logger.info(`fee (wei): ${fee} / (eth): ${toETH(fee)}`)

      let tx = await (await token.sendFrom(...sendFromParams, { value: fee })).wait()
      let recipient = args.recipient ? `${args.recipient} ` : ""
      Logger.info(`[${network.name} => ${args.networkName}] sent ${args.amount} ${contractName} to ${recipient}@ LZ chainId[${lzChainId}] tx: ${tx.transactionHash}`)
    } catch (e) {
      Logger.error(e)
      if (args.debug) throw e
    }
  })

module.exports = {
  lzSend,
}