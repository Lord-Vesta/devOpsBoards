import {
  generateJwtToken,
  passwordComparing,
  passwordHashing,
} from "../../common/utils.js";
import user from "../services/users.services.js";
import { newMessage } from "../messages/user.messages.js";

const { conflict_message, user_signup,unauthorized } = newMessage;

const signupUser = async (req, res) => {
  try {
    const isdeleted = false;
    const {
      body: { emailId, password },
    } = req;
    const emailAlreadyPresent = await user.checkAlreadyPresent(emailId);
    if (emailAlreadyPresent.result.length) {
      throw conflict_message;
    } else {
      const encPassword = await passwordHashing(password);
      await user.signup(emailId, encPassword, isdeleted);
      return user_signup;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const loginUser = async (req, res) => {
  try {
    const {
      body: { emailId, password },
    } = req;
    const userLogin = await user.login(emailId);
    if (userLogin.result.length) {
      const hashedPassword = userLogin.result[0].password;
      const isCorrect = await passwordComparing(password, hashedPassword);
      if (isCorrect) {
        const token = await generateJwtToken(userLogin.result[0]);
        return token;
      } else {
        throw unauthorized
      }
    }
    else{
      throw unauthorized
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  signupUser,
  loginUser,
};




