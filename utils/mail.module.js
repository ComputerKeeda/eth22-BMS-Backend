const Web3 = require("web3")
const web3 = new Web3(
  new Web3.providers.HttpProvider("https://rpc-mumbai.maticvigil.com/")
);
const ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "newowner",
        type: "address",
      },
    ],
    name: "changeOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "reciver",
        type: "address",
      },
      {
        internalType: "string",
        name: "MailSubject",
        type: "string",
      },
      {
        internalType: "string",
        name: "Mailbody",
        type: "string",
      },
      {
        internalType: "string",
        name: "Mailattachment",
        type: "string",
      },
      {
        internalType: "string",
        name: "Mailtimestamp",
        type: "string",
      },
    ],
    name: "mail",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
];

const contractAddress = "0xf5D43bFdb315159248DaF85C1fc27Bf5f2767AA9";
let contract = new web3.eth.Contract(ABI, contractAddress);
web3.eth.accounts.wallet.add(
  "cb006922162673d791b3e0cdaba6f13fda7c9860a0653c94a5b6c75b46772bf6"
);


const Mail = async (mailObj) => {
  try {
    const res = await contract.methods
      .mail(
        mailObj.sender, //sender
        mailObj.receiver, //receiver
        mailObj.mailSubject, // encrypt subhjec
        mailObj.mailBody, // encrpyt // body
        mailObj.mailAttachment, // encrypt // attatchments
        mailObj.timestamp // timestamp
      )
      .send({
        from: "0x8eF657ef1453fa7B7161f20FBbAbF369A9864287",
        gasLimit: web3.utils.toHex(910000),
        maxFeePerGas: web3.utils.toHex(web3.utils.toWei("40", "gwei")),
        maxPriorityFeePerGas: web3.utils.toHex(web3.utils.toWei("40", "gwei")),
      });

    return {
      message: true,
      txhash: res.transactionHash,
    };
  } catch (error) {
    console.log(error);
    return {

      message: false,
      txhash: null,
    };
  }
};

module.exports = { Mail };
