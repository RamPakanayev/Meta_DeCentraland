# Meta DeCentraland

Meta DeCentraland is a decentralized application (DApp) that allows users to buy, sell, and own virtual land in a digital world. This project is built on the Ethereum blockchain and consists of 100 x 100 plots of land, which can be bought and sold as Non-Fungible Tokens (NFTs).
<div align="center">
<img height="500px" src="meta-client\public\mapSimulation.png"></img>
</div>

## Getting Started

To get started with Meta DeCentraland, follow these steps:
*Make sure to install and quickstart Ganache localhost server first. 
 After this, add the truffle-config.js file to ganache workspace.
 Then  do the following:
1) Install contract dependencies, following these steps:
2) >`cd Meta_DeCenterland`
3) >`npm install`
4) >`truffle compile`
5) >`truffle migrate ganache`

6) Once installed, launch the servers with:
 >`npm run dev`
 
 
Install the frontend site dependencies, following these steps:

7) >`cd meta-client`
8) >`npm install`
9) Once installed, launch the site with:
   >`npm start`


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
- `ethers`: A library for interacting with Ethereum and smart contracts.
- `React.js`: A JavaScript library for building  front-end user interfaces.
- `web3`: A JavaScript library for interacting with Ethereum.
- `Truffle` : A development framework for Ethereum dApps
- `Solidity`: smart contract programming language


## Project Features
The Meta DecentaLand project has the following features:

* Home page with a map of the virtual world
* Map legend to help users understand the different plot colors and their meanings
* User authentication using Metamask
* Different user types: guest and buyer/seller
* Different actions based on user type: guests can only view the map, while buyers/sellers can buy and sell virtual land
* Ability to view the details of a plot of virtual land, including its owner, price, and whether it is for sale
* Ability for buyers to purchase virtual land and for sellers to list virtual land for sale


## Future Improvements
Some of the improvements that could be made to the project are:

* Improved user interface and user experience
* Implementation of additional features, such as virtual building and in-game items
* Integration with additional blockchain protocols, such as Binance Smart Chain and Polygon
* Optimization of smart contract gas usage
* Ability for buyers and sellers to see their transactions and transaction history


## Tags

#ethereum #blockchain #dapp #solidity #smartcontracts #nft #erc721 #erc20 #decentraland #react #web3
 
