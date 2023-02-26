# Meta DeCentraland

Meta DeCentraland is a decentralized application (DApp) that allows users to buy, sell, and own virtual land in a digital world. This project is built on the Ethereum blockchain and consists of 100 x 100 plots of land, which can be bought and sold as Non-Fungible Tokens (NFTs).

## Getting Started

To get started with Meta DeCentraland, follow these steps:

1. Clone the repository to your local machine.
2. Install the necessary dependencies using `npm install`.
3. Compile the smart contracts using `npx hardhat compile`.
4. Deploy the smart contracts to a local blockchain network using `npx hardhat node` and `npx hardhat run scripts/deploy.js --network localhost`.
5. Start the frontend using `npm run dev`.

## Smart Contracts

The smart contracts for Meta DeCentraland are built using the Solidity programming language and are located in the `contracts` folder. The following contracts are included:

- `FlatNFT.sol`: Implements the ERC721 standard for NFTs and allows users to mint new NFTs.
- `Marketplace.sol`: Implements a marketplace for buying and selling NFTs.
- `Migrations.sol`: Used for migrations when deploying the smart contracts.
- `PixelZ.sol`: Implements an ERC20 token that can be used as the project's currency.

## Frontend

The frontend for Meta DeCentraland is built using React and can be found in the `frontend` folder. The following features are included:

- View all plots of land.
- Buy and sell plots of land using the marketplace.
- View all owned plots of land.
- View all listed plots of land.
- View your account balance and manage your funds.

## Dependencies

The following dependencies are used in this project:

- `@openzeppelin/contracts`: Provides a collection of reusable smart contracts for the Ethereum blockchain.
- `hardhat`: A development environment for building and testing smart contracts.
- `ethers`: A library for interacting with Ethereum and smart contracts.
- `react`: A JavaScript library for building user interfaces.
- `web3`: A JavaScript library for interacting with Ethereum.

## Tags

#ethereum #blockchain #dapp #solidity #smartcontracts #nft #erc721 #erc20 #decentraland #react #web3
 
