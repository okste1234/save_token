import { ethers } from "hardhat";

async function main() {
  const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const saveERC20 = await ethers.deployContract("SaveERC20", [address]);

  await saveERC20.waitForDeployment();

  console.log(
    `SaveERC20 deployed to ${saveERC20.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
