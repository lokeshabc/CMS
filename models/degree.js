const mongoose = require("mongoose");
const Joi = require("joi");

const createSchema = new mongoose.Schema({

  Degree_Name: {
    type: String,
    required: true,
    unique: true
  },
  Duration: {
    type: Number, 
    required: true,
    message:'Duration must be a number'
}
});

const Degree = mongoose.model("Degree", createSchema);

function validateDegree(degree) {
  const schema = Joi.object({
    Degree_Name: Joi.string().required(),
    Duration: Joi.number().required(),
  });
  return schema.validate(degree);
}
exports.Degree=Degree;
exports.validate = validateDegree;
