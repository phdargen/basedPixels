const hre = require("hardhat");

async function main() {
  const BasedPixels = await hre.ethers.getContractFactory("BasedPixels");
  const basedPixels = await BasedPixels.deploy();

  await basedPixels.waitForDeployment();
  const contractAddress = await basedPixels.getAddress();
  
  console.log(`BasedPixels deployed to ${contractAddress}`);
  
  // Mint one NFT
  const mintTx = await basedPixels.mint({ value: hre.ethers.parseEther("0") });
  const mintReceipt = await mintTx.wait();
  
  console.log(`Successfully minted NFT #1`);
  
  // Paint one pixel black (at position 5,5)
  const paintTx = await basedPixels.paint(1, 5, 5, { value: hre.ethers.parseEther("0") });
  const paintReceipt = await paintTx.wait();
  
  console.log(`Successfully painted pixel at position (5,5) black`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 