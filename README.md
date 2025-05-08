# BasedPixels

<div align="center">
  <img src="public/basedPixels.png" alt="BasedPixels Logo" width="200"/>
</div>

A web3 application showcasing Base's Smart Account features, allowing users to mint and customize NFTs with the iconic Base logo without constant wallet prompts.

## Overview

BasedPixels demonstrates the power of Base's Smart Account system by providing a seamless NFT minting and customization experience. Each NFT is a 10x10 pixel canvas where users can toggle pixels between blank space and the Base logo, creating unique onchain art.

The project leverages Smart Account's sub-accounts to enable a smoother user experience by reducing wallet interaction prompts, making it more convenient for users to interact with their NFTs.

## Features

- Mint unique 10x10 pixel canvas NFTs
- Customize your canvas by toggling pixels between blank space and the Base logo
- Fully on-chain SVG generation
- Popup-less transactions using Smart Account features
- View your NFT directly on OpenSea
- Track all your mint and customization transactions
- Beautiful, responsive UI for easy interaction

## Technology Stack

- Next.js
- TypeScript
- Wagmi
- Viem
- Hardhat
- Solidity
- OpenZeppelin Contracts
- Smart Account with Sub-accounts

## Getting Started

1. Clone the repository
2. Install dependencies for the frontend:
   ```bash
   cd basedPixels
   npm install
   ```
3. Install dependencies for the smart contract:
   ```bash
   cd hardhat-basedPixel
   npm install
   ```
4. Configure Smart Account:
   ```bash
   npm pkg set overrides.@coinbase/wallet-sdk=canary
   ```
5. Run the development server:
   ```bash
   npm run dev
   ```
6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Smart Contract Development

The project includes a Hardhat environment for smart contract development. Key commands:

```bash
cd hardhat-basedPixel
npx hardhat compile
npx hardhat run scripts/deploy.ts --network baseSepolia
npx hardhat verify --network baseSepolia DEPLOYED_CONTRACT_ADDRESS
```

## Contract Features

The BasedPixels NFT contract (`BasedPixels.sol`) includes:

- ERC721 standard implementation
- On-chain SVG generation for NFT images
- Dynamic metadata generation
- Pixel toggling functionality
- Automatic Base logo rendering
- Built-in tracking of Base logo count per NFT

## Usage

1. Connect your Smart Wallet
2. Mint a new BasedPixels NFT
3. Use the interactive canvas to toggle pixels
4. View your creation on OpenSea
5. Track your transactions in the history section

## Architecture

The project consists of two main components:

1. Smart Contract (Solidity):
   - ERC721 token implementation
   - On-chain SVG generation
   - Pixel state management
   - Dynamic metadata generation

2. Frontend (Next.js):
   - Wallet integration with Wagmi
   - Interactive canvas component
   - Transaction management
   - OpenSea integration
   - Real-time pixel updates

## License

This project is licensed under the MIT License.
