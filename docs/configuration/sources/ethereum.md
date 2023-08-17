# Ethereum Ledger

Uses smart contract events and logs directly from ethereum ledger

## Features

* Contracts
* abi
* wss
* logs provider
* trace provider

## Example Config

* ethereum using infura

## Parameters

* provider: This is the Ethereum provider to use. You can use either a Trace or a Log provider.
* https_url: This is the HTTPS URL of the Ethereum node to connect to.
* wss_url: This is the WSS URL of the Ethereum node to connect to.
* from_block: This is the block number to start syncing from.
* to_block: This is the block number to sync up to.
* batch_size: This is the number of blocks to sync at once.
* filter: This is an object that contains filter parameters for the Ethereum connector. It has the following properties:
* addresses: An array of addresses to filter by.
* topics: An array of topics to filter by.wss_url

## Samples

* Local sample in the repo
