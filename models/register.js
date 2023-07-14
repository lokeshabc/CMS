const config=require('config')
const jwt=require('jsonwebtoken')
const mongoose = require("mongoose");
const Joi = require("joi");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    requires: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
schema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, config.get("jwtPrivateKey"));
  return token;
};

const Register = mongoose.model("Register", schema);

function validateUser(register) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });
  return schema.validate(register);
}
exports.Register = Register;
exports.validate = validateUser;
