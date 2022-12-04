const mailModel = require("../models/mail.models");
const mailService = require("../utils/mail.module");
const enc = require("../utils/enc");
const userModels = require("../models/user.models");

const newMail = async (req, res) => {
  try {
    const body = req.body;
    console.log(body);
    let sender = body.sender;
    let receiver = body.receiver;
    let mailSubject = body.mailSubject;
    let mailBody = body.mailBody;
    // let mailAttachment = body.mailAttachment;
    let timestamp = Date.now();

    let mailObject = {
      sender: sender,
      receiver: receiver,
      mailSubject: (await enc.encrypt(mailSubject.toString())).toString(),
      mailBody: (await enc.encrypt(mailBody.toString())).toString(),
      // mailAttachment: (await enc.encrypt(mailAttachment.toString())).toString(),
      timestamp: timestamp,
    };

    // code for decryption

    // let decText = {
    //     mailSubject : (await enc.decrypt(mailObject.mailSubject)).toString()
    // }

    let mailing = await mailService.Mail(mailObject);

    console.log(mailing);

    if (mailing.message) {
      let saveMailInDB = await mailModel.create({
        senderAddress: mailObject.sender,
        receiverAddress: mailObject.receiver,
        body: mailObject.mailBody,
        subject: mailObject.mailSubject,
        // attachment: mailObject.mailAttachment,
        transactionHash: mailing.txhash,
      });

      if (saveMailInDB) {
        res.status(200).json({
          success: true,
          status: 200,
          message: "SUCCESS",
          description: "Mail sent successfully",
        });
      } else {
        res.status(500).json({
          success: false,
          status: 500,
          message: "Internal Server Error",
          description: "Something went wrong",
        });
      }

    } else {
      res.status(500).json({
        success: false,
        status: 500,
        message: "Internal Server Error",
        description: "Something went wrong",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Execption Error",
      description: error.toString(),
    });
  }
};
const getMail = async (req, res) => {
  try {
    const body = req.body;
    console.log(body);
    let userWalletAddress = body.userWalletAddress;
    let sendEmails = [];
    if (userWalletAddress === undefined) {
      res.status(500).json({
        success: false,
        status: 500,
        message: "userWalletAddress is not defined",
        description: "Please provide a valid userWalletAddress",
      });
      return false;
    }

    let getAllEmail = await mailModel.find({
      receiverAddress: userWalletAddress,
    });

    if (getAllEmail) {
      for (let i = 0; i < getAllEmail.length; i++) {
        const element = getAllEmail[i];
        let user = await userModels.findOne({
          walletAddress: element.senderAddress,
        });
        if (user === null) {
          user = {
            username: "unknown",
            ensAvatar : "null"
          };
        }
        sendEmails[i] = {
          senderUsername: user.username,
          senderAvatar : user.ensAvatar,
          senderAddress: element.senderAddress,
          receiverAddress: element.receiverAddress,
          body: (await enc.decrypt(element.body)).toString(),
          subject: (await enc.decrypt(element.subject)).toString(),
          // attachment: (await enc.decrypt(element.attachment)).toString(),
          transactionHash: element.transactionHash,
          timestamp : element.createdAt
        };
      }
      res.status(200).json({
        success: true,
        status: 200,
        message: "Success",
        description: "List(s) of emails",
        data: sendEmails,
      });
      return true;
    } else {
      res.status(500).json({
        success: false,
        status: 500,
        message: "Internal Server Error",
        description: "Something went wrong while getting all emails",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Execption Error",
      description: error.toString(),
    });
  }
};

module.exports = {
  newMail,
  getMail,
};
