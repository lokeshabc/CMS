const mongoose = require("mongoose");
const Joi = require("joi");

const createSchema = new mongoose.Schema({
  
  Department_Name: {
    type: String,
    required: true,
  },
Degree_Name:{
type:mongoose.Schema.Types.ObjectId,
ref:'Degree'
}
});

const Department = mongoose.model("Department", createSchema);

function validateDepartment(department) {
  const schema = Joi.object({
    Department_Name: Joi.string().required(),
   Degree_Name: Joi.string().required()
  });
  return schema.validate(department);
}
exports.Department=Department;
exports.validate = validateDepartment;
