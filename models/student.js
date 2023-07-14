const mongoose = require("mongoose");
const Joi = require("joi");

const createSchema = new mongoose.Schema({
  Enrollment_no: {
    type: Number,
    required: true,
    unique: true,
  },
  Student_Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String, 
    required: true,
    unique: true,
},
Department_Name:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Department'
},
Degree_Name:{
type:mongoose.Schema.Types.ObjectId,
ref:'Degree'
},
Hostel_Name:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Hostel'
},
image:{
type:String,
},
});

const Student = mongoose.model("Student", createSchema);

function validateHostel(student) {
  const schema = Joi.object({
    Enrollment_no: Joi.string().required(),
    Student_Name: Joi.string().required(),
    Email: Joi.string().required().email(),
    Degree_Name: Joi.string().required(),
    Department_Name: Joi.string().required(),
    Hostel_Name:Joi.string().required(),
    image:Joi.string(),
  });
  return schema.validate(student);
}
exports.Student=Student;
exports.validate = validateHostel;
