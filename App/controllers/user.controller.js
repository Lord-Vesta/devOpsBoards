import {
  generateJwtToken,
  passwordComparing,
  passwordHashing,
} from "../../common/utils.js";
import user from "../services/users.services.js";

const signupUser = async (req, res) => {
  try {
    const isdeleted = false;
    const {
      body: { emailId, password },
    } = req;
    const emailAlreadyPresent = await user.checkAlreadyPresent(emailId);
    if (emailAlreadyPresent.error) {
      res.status(500).json({
        status: 500,
        error: "Database error",
        message: emailAlreadyPresent.error.message,
      });
    } else if (emailAlreadyPresent.result.length) {
      res.status(409).json({
        status: 409,
        error: "Email already exists",
        message:
          "The email address provided is already registered. Please use a different email or proceed to login.",
      });
    } else {
      const encPassword = await passwordHashing(password);
      const signupUser = await user.signup(emailId, encPassword, isdeleted);
      if (signupUser.error) {
        res.status(500).json({
          status: 500,
          error: "Database error",
          message: signupUser.error.message,
        });
      } else if (signupUser.roleResult.affectedRows) {
        res.status(201).json({
          status: 201,
          message: "User has been successfully registered",
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: "Server error",
      message: err.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const {
      body: { emailId, password },
    } = req;

    const result = await user.login(emailId);

    if (result.error) {
      res.status(500).json({
        status: 500,
        error: "Database error",
        message: result.error.message,
      });
    } else if (result.result.length) {
      const hash = result.result[0].password;
      const isCorrect = await passwordComparing(password, hash);
      if (isCorrect) {
        const token = await generateJwtToken(result.result[0]);
        res.status(200).json({
          status: 200,
          message: "Login successful",
          token: token,
        });
      } else {
        res.status(401).json({
          status: 401,
          error: "Unauthorized",
          message: "Incorrect username or password.",
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 500,
      error: "Server error",
      message: err.message,
    });
  }
};

export default {
  signupUser,
  loginUser,
};




