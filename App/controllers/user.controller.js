import {
  generateJwtToken,
  passwordComparing,
  passwordHashing,
} from "../../common/utils.js";
import user from "../services/users.services.js";
import { newMessage } from "../messages/user.messages.js";

const { conflict_message, user_signup,unauthorized } = newMessage;

const signupUser = async (emailId, password) => {
  try {
    const checkEmailAlreadyPresent = await user.checkAlreadyPresent(emailId);
    if (checkEmailAlreadyPresent.result.length) {
      throw conflict_message;
    } else {
      const encodedPassword = await passwordHashing(password);
      await user.signup(emailId, encodedPassword);
      return user_signup;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const loginUser = async (emailId, password) => {
  try {
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




