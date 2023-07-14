const auth=require('../middleware/auth')
const Joi = require("joi");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const {Register } = require("../models/register");
const express = require("express");
const router = express.Router();


router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let register = await Register.findOne({ email: req.body.email });
  if (!register) return res.status(400).send("invalid email or password");

  const validPassword = await bcrypt.compare(req.body.password, register.password);
  if (!validPassword) return res.status(400).send("invalid email or password");

  const token = register.generateAuthToken();
  res.send(token);
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(req);
}

module.exports = router;
