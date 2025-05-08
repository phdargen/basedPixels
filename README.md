# BasedPixels

<div align="center">
  <img src="public/basedPixels.png" alt="BasedPixels Logo" width="200"/>
</div>


## Overview

BasedPixels showcases how to use Smart Wallets with Sub Accounts to create a seamless NFT minting and customization experience. 

Each BasedPixels NFT starts as a blank 10x10 pixel canvas.
The canvas is a fully onchain SVG with dynamic metadata.
Users can customize their NFT by toggling the Base logo for each pixel with a onchain transaction. 

By implementing Smart Wallet Sub Accounts with Spend Permissions, BasedPixels enables transactions without authentication popups, significantly enhancing user experience. 


## Features

- Mint 10x10 pixel canvas NFT
- Customize it by toggling pixels between blank space and the Base logo
- Fully onchain SVG generation
- Popup-less transactions using Smart Wallet Sub Accounts and Spend Limits
- View your NFT on OpenSea (might have to manually refresh metadata on their page to see changes)

## Technology Stack

- Next.js
- Wagmi/Viem
- Hardhat
- Solidity
- [CDP Smart Wallets with Sub-accounts](https://docs.base.org/identity/smart-wallet/guides/sub-accounts)

## Deployed Contracts & Links

- [NFT Contract on Base Sepolia](https://sepolia.basescan.org/address/0x036193094D39Aa6B14Cd0d4cdF3a494A3FAAD317)
- [Collection on OpenSea](https://testnets.opensea.io/collection/basedpixels-1)

## Getting Started

1. Clone the repository
2. Install dependencies for the smart contract:
   ```bash
   cd hardhat-basedPixel
   npm install
   ```
3. Compile and deploy contract
   ```bash
    npx hardhat compile
    npx hardhat run scripts/deploy.ts --network baseSepolia
    npx hardhat verify --network baseSepolia DEPLOYED_CONTRACT_ADDRESS
   ```
4. Install dependencies for the frontend:
   ```bash
   cd basedPixels
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser


## Smart contract Features

The BasedPixels NFT contract (`BasedPixels.sol`) includes:

- ERC721 standard implementation
- Fully onchain SVG generation for NFT images with dynamic metadata
- Pixel toggling function to add Base logo
- Tracking of Base logo count per NFT

## Usage

1. Log in with Smart Wallet and create sub account with spending limit
2. Mint a new BasedPixels NFT
3. Use the interactive canvas to toggle pixels
4. View your creation on OpenSea
5. Track your transactions in the history section

## License

This project is licensed under the MIT License.
