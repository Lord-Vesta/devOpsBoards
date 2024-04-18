import {
  generateJwtToken,
  passwordComparing,
  passwordHashing,
} from "../../common/utils.js";
import { checkAlreadyPresent, signup,login } from "../services/users.services.js";

export const signupUser = (req, res) => {
  try {
    const isdeleted = false;
    const {
      body: { emailId, password },
    } = req;
    checkAlreadyPresent(emailId, async function (err,result) {
      if(err){
        res.status(500).json({
          status: 500,
          error: "Database error",
          message: err.message,
        });
      }
      else if(result){
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
            isdeleted,
            async function (err,result) {
              console.log(result);
              if (result) {
                res.status(201).json({
                  status: 201,
                  message: "User has been successfully registered",
                });
              }
              else if(err){
                res.status(500).json({
                  status: 500,
                  error: "Database error",
                  message: err.message,
                });
              }
            }
          );
        }
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

    login(emailId, async function (err,result) {
      console.log(result);
      if(err){
        res.status(500).json({
          status: 500,
          error: "Database error",
          message: err.message,
        });
      }
      else if (result) {
        if(result.length){
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
