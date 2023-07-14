const auth=require('../middleware/auth');
const _=require('lodash');
const bcrypt=require('bcrypt')
const { Register, validate } = require("../models/register");
const express = require("express");
const router = express.Router();


router.get("/", auth, async (req, res) => {
  const register = await Register.findById(req.user._id).select("-password");
  res.send(register);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let register = await Register.findOne({ email: req.body.email });
  if (register) return res.status(400).send("user already there");

  register = new Register(_.pick(req.body, ["name", "email", "password"]));

  const salt = await bcrypt.genSalt(10);
  register.password = await bcrypt.hash(register.password, salt);
  await register.save();

  const token = register.generateAuthToken();
  res
    .header("x-auth-token", token)
    .send(_.pick(register, ["_id", "name", "email"]));
});

module.exports = router;
