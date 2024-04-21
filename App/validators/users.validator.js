import Joi from "joi";

const signup = (req, res, next) => {
  const schema = Joi.object({
    emailId: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    console.log(error);
    res.status(400).json({
      status: 400,
      error: "Bad Request",
      message:
        "Validation failed. Please check the following fields: " +
        error.details.map((error) => error.message).join(", "),
    });
  } else {
    next();
  }
};

const login = (req, res, next) => {
  const schema = Joi.object({
    emailId: Joi.string().required().email(),
    password: Joi.string().required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    console.log(error);
    res.status(400).json({
      status: 400,
      error: error.details[0].message,
      message:
        "Validation failed. Please check the following fields: " +
        error.details.map((error) => error.message).join(", "),
    });
  } else {
    next();
  }
};

export default {
  signup,
  login,
};
