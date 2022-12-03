const router = require("express").Router();
const userController = require("../controllers/user.controller");

// web3 api's
router.post("/login", userController.login); // done
router.post("/createUser", userController.createUser); // done

module.exports = router;
