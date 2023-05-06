const { ethers } = require("ethers");

task("createTags", "Create CTAGs")
  .addParam("tags", 'Hashtags separated by commas. eg. --tags "#USDC, #Solana"')
  .addParam("relayer", "Relayer name.")
  .addParam(
    "signer",
    'Named wallet accounts. options are "account0", "account1", "account2", "account3", "account4", "account5". Defaults to "account0"',
    "account0",
  )
  .setAction(async (taskArgs) => {
    const { getAccounts } = require("./utils/getAccounts");
    const accounts = await getAccounts();
    const chainId = hre.network.config.chainId;
    const config = require("../config/config.json");

    // ABIs
    const ETSTokenABI = require("../abi/contracts/ETSToken.sol/ETSToken.json");
    const ETSAccessControlsABI = require("../abi/contracts/ETSAccessControls.sol/ETSAccessControls.json");
    const ETSRelayerV1ABI = require("../abi/contracts/relayers/ETSRelayerV1.sol/ETSRelayerV1.json");

    // Contract Addresses
    const ETSAccessControlsAddress = config[chainId].contracts.ETSAccessControls.address;
    const ETSTokenAddress = config[chainId].contracts.ETSToken.address;

    // Contract instances
    const etsAccessControls = new ethers.Contract(
      ETSAccessControlsAddress,
      ETSAccessControlsABI,
      accounts[taskArgs.signer],
    );
    const etsToken = new ethers.Contract(ETSTokenAddress, ETSTokenABI, accounts[taskArgs.signer]);

    // Check that caller is using a valid relayer.
    let etsRelayerV1;
    const relayerAddress = await etsAccessControls.getRelayerAddressFromName(taskArgs.relayer);
    if ((await etsAccessControls.isRelayer(relayerAddress)) === false) {
      console.log(`"${taskArgs.relayer}" is not a relayer`);
      return;
    } else {
      etsRelayerV1 = new ethers.Contract(relayerAddress, ETSRelayerV1ABI, accounts[taskArgs.signer]);
    }

    const tags = taskArgs.tags.replace(/\s+/g, "").split(","); // remove spaces & split on comma
    let tagsToMint = [];

    for (let i = 0; i < tags.length; i++) {
      const tagId = await etsToken.computeTagId(tags[i]);
      if (await etsToken.tagExistsById(tagId)) {
        console.log(`${tags[i]} already exists`);
      } else {
        tagsToMint.push(tags[i]);
      }
    }

    if (tagsToMint.length > 0) {
      console.log(`Minting CTAGs "${tagsToMint.toString()}"`);
      const tx = await etsRelayerV1.getOrCreateTagIds(tagsToMint);
      await tx.wait();

      for (let i = 0; i < tagsToMint.length; i++) {
        const tagId = await etsToken.computeTagId(tags[i]);
        if (await etsToken.tagExistsById(tagId)) {
          console.log(`"${tagsToMint[i]}" minted by ${taskArgs.signer} with id ${tagId}`);
        }
      }
    }
  });
