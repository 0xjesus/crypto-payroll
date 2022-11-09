// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require('hardhat')

async function main () {
  const PSHandler = await ethers.getContractFactory('PSHandler')
  const PSplitter = await ethers.getContractFactory('PSplitter')
  const PSHandlerInstance = await PSHandler.deploy()
  await PSHandlerInstance.deployed()

  console.log('PSHandler:', PSHandler.address)
  console.log('PSplitter:', PSplitter.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
