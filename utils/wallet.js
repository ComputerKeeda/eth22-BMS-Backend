const walletModel = require("../models/wallet.model");
const Web3 = require('web3');
const enc = require("./enc");


const getNewWallet = async () => {
  try{
    var web3 = new Web3(new Web3.providers.HttpProvider(process.env.RPC));
    var newWallet= await web3.eth.accounts.create(web3.utils.randomHex(32));
    var walletAddress = newWallet.address;
    var walletKey = (await enc.encrypt(newWallet.privateKey)).toString();

    var data = ({
      walletAddress:walletAddress,
      enc:walletKey
    });

    const create = await walletModel.create(data);
    if(create==null){
        return null;
    }
    else
    {
       return create._id;
    }

  }
  catch(e){
    return null;
  }
};

module.exports = { getNewWallet };
