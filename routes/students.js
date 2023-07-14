
const { Student, validate } = require("../models/student");
const _ = require("lodash");
const express = require("express");
const router = express.Router();




router.post("/", async (req, res) => {
  try{
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let student = await Student.findOne ({
    $or:[{ Enrollment_no: req.body.Enrollment_no },
    {Email:req.body.Email}]
});
  if (student) return res.status(400).send("user already there");

  student = new Student({
    // _.pick(req.body, ["Enrollment_no","Student_Name","Email","Department_Name","Degree_Name","Hostel_Name"])
    Enrollment_no: req.body.Enrollment_no,
    Student_Name: req.body.Student_Name,
    Email: req.body.Email,
    Department_Name: req.body.Department_ame,
    Degree_Name: req.body.Degree_Name,
    Hostel_name: req.body.Hostel_Name,
   
  });
  console.log(req.file)
  await student.save();
  res.send(student);
} catch (err) {
  console.error(err);
  res.status(500).send("Failed to upload image");
}
});


router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try{
  const student= await Student.findById(id);
  if (!student) return res.status(404).send("id was not found");
  res.send(student);
  }
  catch (err) {
    return res.status(500).send('Error retrieving degree');
  }
});

router.get("/", async (req, res) => {
  const student = await Student.find();
  res.send(student);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }
  const id = req.params.id;
  Student.findByIdAndUpdate(id, req.body, { new: true, useFindAndModify: false })
    .then((updatedData) => {
      if (!updatedData) return res.status(404).send("canot update");
      res.send(updatedData);
    })
    .catch((err) => {
      res.status(500).send("error update user information");
    });
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try{
  const student = await Student.findByIdAndRemove(id);
  if (!student) return res.status(404).send("degree with given id not found");
  res.send("deleted");
  }
  catch (err) {
    return res.status(500).send('Error retrieving degree');
  }
});

module.exports = router;
