const userModel = require("../models/user.models");

const createUser = async (req, res) => {
  try {
    const body = req.body;
    let walletAddress = body.walletAddress;
    let ensName = body.ensName;
    let ensAvatar = body.ensAvatar;
    let username = body.username;
    console.log(ensName, ensAvatar);

    if (ensName === undefined ) {
      ensName = "null";
    }
    if (ensAvatar === undefined) {
      ensAvatar = "null";
    }
    if (username.length < 4 || username === undefined) {
      res.status(406).json({
        success: false,
        status: 406,
        message: "Username must be at least greater than 3 digits",
        description: "Please enter a valid username",
      });
      return false;
    }

    const selectUser = await userModel.findOne({
      walletAddress: walletAddress,
    });

    if (selectUser != null) {
      res.status(200).json({
        success: true,
        status: 200,
        message: "User already exists",
        description: "No need to create a new user",
      });
      return true;
    } else {
      const usernameCheck = await userModel.findOne({
        username: username,
      });

      if (usernameCheck) {
        res.status(406).json({
          success: false,
          status: 406,
          message: "Username already taken",
          description: "Please enter a valid username",
        });
        return false;
      } else {
        //  write a code to create a new user
        const createNewUser = await userModel.create({
          walletAddress: walletAddress,
          ensName: ensName,
          ensAvatar: ensAvatar,
          username: username,
        });

        if (createNewUser) {
          res.status(200).json({
            success: true,
            status: 200,
            message: "SUCCESS",
            description: "User created successfully",
          });
          return false;
        } else {
          res.status(500).json({
            success: false,
            status: 500,
            message: "Internal Server Error",
            description: "Something went wrong ",
          });
          return false;
        }
      }
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

const login = async (req, res) => {
  try {
    const body = req.body;
    let walletAddress = body.walletAddress;
    const selectUser = await userModel.findOne({
      walletAddress: walletAddress,
    });

    if (selectUser != null) {
      res.status(200).json({
        success: true,
        status: 200,
        message: "User already exists",
        description: "Login successful",
      });
      return true;
    } else {
      res.status(302).json({
        success: false,
        status: 302,
        message: "User doesn't exist",
        description: "Please provide a username",
      });
      return false;
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
  login,
  createUser,
};
