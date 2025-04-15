const commandAcions = require('../socketFunctions');
const CONST = require('../../../constant');
const UserOtp = require('../../models/userOtp');
const smsActions = require('../sms');
const mongoose = require('mongoose');
const logger = require('../../../logger');
const { userSesssionSet, filterBeforeSendSPEvent, getUserDefaultFields, saveGameUser } = require('./appStart');
const Users = mongoose.model('users');

const checkMobileNumber = async (requestData, socket) => {
  logger.info(' Signup validation Request Data ->', requestData);

  if (requestData.mobileNumber.length !== 10) {
    commandAcions.sendEvent(socket, CONST.CHECK_MOBILE_NUMBER, requestData, false, 'Please check mobile Number!');
    return false;
  }

  if (requestData.mobileNumber) {
    let wh = {
      mobileNumber: requestData.mobileNumber,
    };
    logger.info('checkMobileNumber wh ::', wh);

    let resp = await Users.findOne(wh, { username: 1, _id: 1 });
    logger.info('checkMobileNumber resp ::', resp);

    if (resp !== null) {
      commandAcions.sendEvent(socket, CONST.CHECK_MOBILE_NUMBER, { valid: true, type: CONST.LOGIN_TYPE.LOGIN });
    } else {
      commandAcions.sendEvent(socket, CONST.CHECK_MOBILE_NUMBER, { valid: true, type: CONST.LOGIN_TYPE.SIGNUP });
    }
  } else {
    commandAcions.sendEvent(socket, CONST.CHECK_MOBILE_NUMBER, requestData, false, 'Enter Valid mobile Number!');
  }
  return true;
};

const checkReferalOrCouponCode = async (requestData, socket) => {
  if (requestData.code.length !== 0 && requestData.code.length <= 10) {
    let wh = {
      rfc: requestData.code.toLowerCase(),
    };

    let resp = await Users.findOne(wh, { username: 1, _id: 1 });
    //csl('checkReferalOrCouponCode resp ::', resp);
    if (resp !== null) {
      let response = { valid: true, msg: 'Congrats! Referral Code Valid' };
      commandAcions.sendEvent(socket, CONST.CHECK_REFERAL_CODE, response);
    } else {
      commandAcions.sendEvent(socket, CONST.CHECK_REFERAL_CODE, requestData, false, 'Enter valid referral!');
    }
  } else {
    commandAcions.sendEvent(socket, CONST.CHECK_REFERAL_CODE, requestData, false, 'Enter valid referral!');
  }
  return true;
};

/*
email
username
*/

const userLogin = async (requestData, socket) => {
  if (requestData.name == undefined || requestData.password == undefined) {
    commandAcions.sendEvent(socket, CONST.LOGIN, requestData, false, 'Please check Username!');
    return false;
  }

  let wh = {
    name: requestData.name,
    password: requestData.password
  };
  //  csl('F wh :', wh);
  logger.info('LOGIN EHH :', wh);
  let resp = await Users.findOne(wh, {});
  logger.info('LOGIN resp :', resp);


  if (resp != null) {
    if (resp.sckId != "") {
      commandAcions.sendEvent(socket, CONST.LOGIN, requestData, false, 'User already logged in another device..!');
      return false
    }

    if (!resp.status) {
      commandAcions.sendEvent(socket, CONST.LOGIN, requestData, false, 'User blocked, connect to Admin..!');
      return false
    }

    // eslint-disable-next-line no-unused-vars
    //let otpsend = await smsActions.sendOTP(requestData, socket);
    //csl('LOGIN Otp Send :: ', JSON.stringify(otpsend));
    //let response = { mobileNumber: requestData.mobileNumber, status: true };

    await userSesssionSet(resp, socket);

    let response = await filterBeforeSendSPEvent(resp);

    commandAcions.sendEvent(socket, CONST.DASHBOARD, response);


  } else {
    commandAcions.sendEvent(socket, CONST.LOGIN, requestData, false, 'Please enter valid Username or Password.');
  }




  return true;
};
const changePassword = async (requestBody, socket) => {
  try {
    logger.info('Register User Request Body =>', requestBody);
    const { playerId, oldPassword, newPassword } = requestBody;

    let query = { _id: playerId };
    let result = await Users.findOne(query, {});
    logger.info("Change User : ",result);
    if (result) {

      if (result.password == oldPassword) {
        logger.info("CHnaged Password", requestBody.newPassword);
        await Users.updateOne(
          query,
          {
            $set: {
              password: newPassword,
            },  
          },
          {}
        );
        requestBody['password']=newPassword
        
        commandAcions.sendEvent(socket, CONST.CHANGEPASSWORD, requestBody);
      }else{
        commandAcions.sendEvent(socket, CONST.CHANGEPASSWORD, requestBody, false, 'Current Password is not Match!');
      }
    } else {
      commandAcions.sendEvent(socket, CONST.CHANGEPASSWORD, requestBody, false, 'Somthing went wrong!');
      return false;
    }

  } catch (error) {
    logger.error('mainController.js registerUser error=> ', error);
    return {
      message: 'something went wrong while registering, please try again',
      status: 0,
    };
  }
};
const userSignup = async (requestData_, socket) => {
  let requestData = requestData_;
  if (requestData.mobileNumber.length !== 10) {
    commandAcions.sendEvent(socket, CONST.SIGNUP, requestData, false, 'Please check Username!');
    return false;
  }

  let wh = {
    mobileNumber: requestData.mobileNumber,
  };
  //  logger.info('userSignup wh :', wh);

  let resp = await Users.findOne(wh, { username: 1, _id: 1 });
  //  logger.info('userSignup resp :', resp);

  if (resp === null) {
    requestData.new_user = true;
    // eslint-disable-next-line no-unused-vars
    let otpsend = await smsActions.sendOTP(requestData, socket);
    //logger.info('userSignup Otp Send :: ', JSON.stringify(otpsend));

    let response = { mobileNumber: requestData.mobileNumber, status: true };
    commandAcions.sendEvent(socket, CONST.REGISTER_USER, response);
  } else {
    commandAcions.sendEvent(socket, CONST.REGISTER_USER, requestData, false, 'Username is already register!');
  }
  return true;
};

const verifyOTP = async (requestData_, socket) => {
  let requestData = requestData_;
  if (requestData.mobileNumber.length !== 10) {
    commandAcions.sendEvent(socket, CONST.VERIFY_OTP, requestData, false, 'Please check Username!');
    return false;
  }

  let mobileNumberRd = requestData.mobileNumber;

  let wh = {
    mobileNumber: mobileNumberRd,
    otp: Number(requestData.otp),
    codeVerify: false,
  };

  let otpData = await UserOtp.findOne(wh, {});
  //  csl('\nverifyOTP otpData : ', wh, otpData);

  if (otpData !== null) {
    await UserOtp.updateOne(
      {
        _id: otpData._id,
      },
      {
        $set: {
          codeVerify: true,
        },
      },
      {}
    );
    requestData['codeVerify'] = true;
    commandAcions.sendEvent(socket, CONST.VERIFY_OTP, requestData);
  } else {
    commandAcions.sendEvent(socket, CONST.VERIFY_OTP, requestData, false, 'Incorrect OTP');
  }
  return true;
};

const resendOTP = async (requestData_, socket) => {
  let requestData = requestData_;
  if (requestData.mobileNumber.length !== 10) {
    commandAcions.sendEvent(socket, CONST.RESEND_OTP, requestData, false, 'Please check Username!');
    return false;
  }

  let mobileNumberRd = requestData.mobileNumber;

  let wh = {
    mobileNumber: mobileNumberRd,
    codeVerify: false,
  };

  let otpData = await UserOtp.findOne(wh, {});
  //  csl('\nresendOTP otpData : ', wh, otpData);

  if (otpData !== null) {
    requestData.reSend = true;
    await smsActions.sendOTP(requestData, socket);
    let response = { mobileNumber: requestData.mobileNumber, status: true };
    commandAcions.sendEvent(socket, CONST.RESEND_OTP, response);
  } else {
    commandAcions.sendEvent(socket, CONST.RESEND_OTP, requestData, false, 'Enter Valid Username!');
  }
  return true;
};

/**
 * @description Register user for New Game
 * @param {Object} requestBody
 * @returns {Object}{ status:0/1, message: '', data: Response }
 */
const registerUser = async (requestBody, socket) => {
  try {
    logger.info('Register User Request Body =>', requestBody);
    const { name, deviceId, isVIP } = requestBody;

    let query = { name: name };
    let result = await Users.findOne(query, {});
    if (!result) {


      let response = await getRegisterUserDetails(requestBody)
      // let defaultData = await getUserDefaultFields(requestBody, socket);
      // logger.info('registerUser defaultData : ', defaultData);

      // let userInsertInfo = await saveGameUser(defaultData, socket);
      // logger.info('registerUser userInsertInfo : ', userInsertInfo);

      // let userData = userInsertInfo;

      // socket && await userSesssionSet(userData, socket);

      // let response = await filterBeforeSendSPEvent(userData);

      commandAcions.sendEvent(socket, CONST.DASHBOARD, response);
    } else {
      commandAcions.sendEvent(socket, CONST.DASHBOARD, requestBody, false, 'User Already Register!');
      return false;
    }

  } catch (error) {
    logger.error('mainController.js registerUser error=> ', error);
    return {
      message: 'something went wrong while registering, please try again',
      status: 0,
    };
  }
};


const getRegisterUserDetails = async (requestBody, socket) => {
  try {
    let defaultData = await getUserDefaultFields(requestBody, socket);
    logger.info('registerUser defaultData : ', defaultData);

    let userInsertInfo = await saveGameUser(defaultData, socket);
    logger.info('registerUser userInsertInfo : ', userInsertInfo);

    let userData = userInsertInfo;

    socket && await userSesssionSet(userData, socket);

    let response = await filterBeforeSendSPEvent(userData);

    return response

  } catch (error) {
    logger.error('mainController.js registerUser error=> ', error);
    return {
      message: 'something went wrong while registering, please try again',
      status: 0,
    };
  }
};

module.exports = {
  checkMobileNumber,
  checkReferalOrCouponCode,
  userLogin,
  userSignup,
  verifyOTP,
  resendOTP,
  registerUser,
  getRegisterUserDetails,
  changePassword,
};
