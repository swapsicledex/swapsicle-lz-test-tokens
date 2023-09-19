# swapsicle-lz-test-tokens

## Deploy

```
NETWORK=fuji
NETWORK=telos_testnet
NETWORK=mantle_testnet

npx hardhat --network $NETWORK deploy --tags LzTest

npx hardhat --network $NETWORK sourcify
```

## Deploying LayerZero tokens

Before deploying LayerZero OFTV2 tokens, make sure that the [services/constants.js](services/constants.js) file is up to date.

In case, find LayerZero endpoints at <https://layerzero.gitbook.io/docs/> > Technical reference > Mainnet or Testnet > Mainnet or Testnet Addresses

## Set trusted remotes

After deploying the tokens to all networks, you need to set the trusted remotes for the tokens, as follows (run for each $NETWORK):

```
npx hardhat --network $NETWORK lz-remotes LzTest
```

## Verify

First of all, add the missing `API_KEY` in the `.env` file and in the `hardhat.config.js` (also at the end of the file under `etherscan` > `apiKey` you need to add the key under a new $NETWORK name).

To verify a contract, you don't even need to write a script, you can do it via command line (assumption: you verify contracts compiled in this hardhat project) as follows:

Telos:

```
npx hardhat --network $NETWORK sourcify
```

Mantle:

Contract constructor with 0 arguments:
```
npx hardhat verify --network $NETWORK contractAddress
```

If the constructor has arguments, you must provide them as follows:
```
npx hardhat verify --network $NETWORK contractAddress constructorArg1 constructorArg2 constructorArgN
```

## Send LZ tokens

```
npx hardhat --network $NETWORK lz-send AMOUNT CONTRACT_NAME DESTINATION_NETWORK_NAME`

# You can also set a different recipient:
npx hardhat --network $NETWORK lz-send AMOUNT CONTRACT_NAME DESTINATION_NETWORK_NAME --recipient RECIPIENT_ADDRESS
```

Examples:

```
npx hardhat --network fuji lz-send 11 LzTest mantle_testnet
```
