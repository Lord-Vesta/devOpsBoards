import {
  generateJwtToken,
  passwordComparing,
  passwordHashing,
} from "../../common/utils.js";
import { checkAlreadyPresent, signup } from "../services/users.services.js";

export const signupUser = (req, res) => {
  try {
    const roleId = 1;
    const isdeleted = false;
    const {
      body: { emailId, password },
    } = req;
    checkAlreadyPresent(emailId, async function (result) {
      if (result.length) {
        res.status(409).json({
          status: 409,
          error: "Email already exists",
          message:
            "The email address provided is already registered. Please use a different email or proceed to login.",
        });
      } else {
        const encPassword = await passwordHashing(password);
        signup(
          emailId,
          encPassword,
          roleId,
          isdeleted,
          async function (result) {
            if (result) {
              res.status(201).json({
                status: 201,
                message: "User has been successfully registered",
              });
            }
          }
        );
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: "Server error",
      message: err.message,
    });
  }
};

export const loginUser = (req, res) => {
  try {
    const {
      body: { emailId, password },
    } = req;

    checkAlreadyPresent(emailId, async function (result) {
      if (result.length) {
        const hash = result[0].password;
        const isCorrect = await passwordComparing(password, hash);
        if (isCorrect) {
          const token = await generateJwtToken(result[0]);
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
      } else {
        res.status(401).json({
          status: 401,
          error: "Unauthorized",
          message: "Incorrect username or password.",
        });
      }
    });
  } catch (err) {
    res
      .status(500)
      .json({ 
        status: 500, 
        error: "Server error", 
        message: err.message });
  }
};
