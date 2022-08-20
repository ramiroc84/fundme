// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers, network } = require("hardhat");

async function main() {
  // 1- yarn hardhat node <- levanta la blockchain local
  // 2- yarn hardhat run scripts/deploy.js <- hace el deploy del contrato
  // 3- Copiar la contract address y pegarla en el archivo constants.js para que el fe pueda conectarse
  const FundMeFactory = await ethers.getContractFactory("FundMe");
  console.log("Desplegando contrato...");
  const fundme = await FundMeFactory.deploy();

  await fundme.deployed();

  console.log(`CONTRATO DEPLOYED EN: ${fundme.address}`);
  console.log(network.config);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
