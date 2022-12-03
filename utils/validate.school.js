const emailValidate = require("./validate.email");

const validation = async (body) => {
  // school body data
  const schoolName = body.schoolName;
  const emailAddress = body.emailAddress;
  const schoolAddress = body.schoolAddress;
  const schoolPhoneNumber = body.schoolPhoneNumber;
  // admin body data
  const adminName = body.adminName;
  const adminEmail = body.adminEmail;

  // Validations
  if (emailValidate.check(emailAddress)===null){
    return {
      success: false,
      status: 403,
      message: "Validation Error",
      description: "Invalid Email Format",
    };
  }
  else if (emailValidate.check(adminEmail)===null) {
    return {
      success: false,
      status: 403,
      message: "Validation Error",
      description: "Invalid Email Format",
    };
  } else if (schoolName.length < 2) {
    return {
      success: false,
      status: 403,
      message: "Validation Error",
      description: "School name is too short.",
    };
  } else if (adminName.length < 2) {
    return {
      success: false,
      status: 403,
      message: "Validation Error",
      description: "Admin name is to short",
    };
  } else if (schoolPhoneNumber.length < 0) {
    return {
      success: false,
      status: 403,
      message: "Validation Error",
      description: "Invalid IP Address detected",
    };
  } else if (schoolAddress.length < 0) {
    return {
      success: false,
      status: 403,
      message: "Validation Error",
      description: "Invalid IP Address detected",
    };
  } else {
    return null;
  }
};
module.exports = { validation };
