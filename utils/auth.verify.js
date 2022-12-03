 const enc = require("../utils/enc");
const jwt = require("jsonwebtoken");
const superAdminsModels = require("../models/superAdmin.model");
const adminsModels = require("../models/admin.model");
const userModels = require("../models/user.model");

const auth_verify = async (data) => {
  try {
    const token_verification = await jwt.verify(data.auth, process.env.JWT_KEY);

    if (token_verification) {
      const userID = (await enc.decrypt(token_verification.uid)).toString();
        let user = null;
      if (token_verification.uaccess == "super-admin") {
        user = await superAdminsModels.findOne({ _id: userID });
      } else if (token_verification.uaccess == "admin" || token_verification.uaccess == "sub-admin") {
        user = await adminsModels.findOne({ _id: userID });
      }
      else if (token_verification.uaccess == "student") {
        user = await userModels.findOne({ _id: userID });
      }
       
      if (user == null) return null;
      return user;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
// const auth_verify = async(data)=>{
//     try
//     {
//         const token_verification = await jwt.verify(data.auth, process.env.JWT_KEY);
//         if(token_verification)
//         {
//             const userID = (await enc.decrypt(token_verification.uid)).toString();
//             const user = await superAdminsModels.findOne({_id:userID});
//             if(user==null)
//             return null;
//             return user;
//         }
//         else
//         {
//             return null;
//         }
//     }
//     catch(error)
//     {
//         return null;
//     }

// }
module.exports = {
  auth_verify,
};
