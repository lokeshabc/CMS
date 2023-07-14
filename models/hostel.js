const mongoose = require("mongoose");
const Joi = require("joi");

const createSchema = new mongoose.Schema({
  
  Hostel_Name: {
    type: String,
    required: true,
  },
    Gender: {
    type: String, 
    required: true,
}
});

const Hostel = mongoose.model("Hostel", createSchema);

function validateHostel(hostel) {
  const schema = Joi.object({
    Hostel_Name: Joi.string().required(),
    Gender: Joi.string().required(),
  });
  return schema.validate(hostel);
}
exports.Hostel=Hostel;
exports.validate = validateHostel;
