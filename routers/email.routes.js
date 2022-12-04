const router = require("express").Router();
const mailController = require("../controllers/mail.controller");

// web3 api's
router.post("/sendMail", mailController.newMail); // done
router.post("/getMail" , mailController.getMail); // done

module.exports = router;
