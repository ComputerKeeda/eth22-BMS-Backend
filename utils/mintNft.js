require("dotenv").config();
const Web3 = require("web3");
const web3 = new Web3(process.env.RPC);
// import { create as ipfsHttpClient } from "ipfs-http-client";
// const ipfsHttpClient = require('ipfs-http-client').create
// import { fs } from "file-system";
// const ipfsClient = ipfsHttpClient(process.env.IPFS); // IPFS GATEWAY


// contractAddress --> nft collection's contractAddress
const mintNft = async ( contractAddress, reciverWalletAddress, account, key, imageFile) => {
  let address = contractAddress;
  let mintAbi = [
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
        {
          internalType: "string",
          name: "uri",
          type: "string",
        },
      ],
      name: "safeMint",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  let chabhi = key.slice(2);

  await web3.eth.accounts.wallet.add(chabhi);

  try {
    let file = imageFile; // TODO: Pass IMAGE PATH  here only
    const image = await ipfsClient.add(file);
    
    const url = `https://ipfs.io/ipfs/${image.path}`;
    let json = {
      name: "aakash",
      image_url: url,
    };

    const metadata = await ipfsClient.add(JSON.stringify(json));
    let imageIpfsHash = image.path;
    let metadataIpfsHash = metadata.path;
    var nftMint = new Contract(mintAbi, address);
    let nft = await nftMint.methods
      .safeMint(reciverWalletAddress, metadataIpfsHash)
      .send({
        from: account,
        gasLimit: web3.utils.toHex(1000000),
        gasPrice: web3.utils.toHex(web3.utils.toWei("0", "gwei")),
      });

    let res = await web3.eth.getTransactionReceipt(nft.transactionHash);
    console.log(res);

    let output = {
      txHash: res.transactionHash,
      imageIpfsHash: imageIpfsHash,
      metadataIpfsHash: metadataIpfsHash,
    };
    return output;
  } catch (error) {
    console.log(error);
    return false;
  }

  return;
};

module.exports = { mintNft };
