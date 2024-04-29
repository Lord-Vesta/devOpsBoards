import {
  generateJwtToken,
  passwordComparing,
  passwordHashing,
} from "../../common/utils.js";
import user from "../services/users.services.js";
import { newMessage } from "../messages/user.messages.js";
import { responseHandler } from "../../common/handlers.js";

const { conflict_message, user_signup, login_successfull,unauthorized } = newMessage;

const signupUser = async (req, res) => {
  try {
    console.log("inside signup try");
    const isdeleted = false;
    const {
      body: { emailId, password },
    } = req;
    const emailAlreadyPresent = await user.checkAlreadyPresent(emailId);
    if (emailAlreadyPresent.result.length) {
      throw conflict_message;
    } else {
      const encPassword = await passwordHashing(password);
      const signupUser = await user.signup(emailId, encPassword, isdeleted);
      const response = new responseHandler(
        user_signup.statusCode,
        signupUser.roleResult,
        user_signup.message
      );
      return response;
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
        const response = new responseHandler(
          login_successfull.statusCode,
          token,
          login_successfull.message
        )
        return response;
      } else {
        throw unauthorized;
      }
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




