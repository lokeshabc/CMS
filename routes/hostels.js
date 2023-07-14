const auth=require('../middleware/auth');
const { Hostel, validate } = require("../models/hostel");
const _ = require("lodash");
const express = require("express");
const router = express.Router();

router.post("/",auth, async (req, res) => {
  try{
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    const hostel = new Hostel(_.pick(req.body, ["Hostel_Name" , "Gender"]));
    await hostel.save();
    // res.send(department);
  res.send(hostel)
   }catch(err){
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
   });

router.get("/:id", auth,async (req, res) => {
  const id = req.params.id;
  try{
  const hostel = await Hostel.findById(id);
  if (!hostel) return res.status(404).send("id was not found");
  res.send(hostel);
  }
  catch (err) {
    return res.status(500).send('Error retrieving degree');
  }
});

router.get("/", auth,async (req, res) => {
  const hostel = await Hostel.find();
  res.send(hostel);
});

router.put("/:id", auth,async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }
  const id = req.params.id;
  Hostel.findByIdAndUpdate(id, req.body, { new: true, useFindAndModify: false })
    .then((updatedData) => {
      if (!updatedData) return res.status(404).send("canot update");
      res.send(updatedData);
    })
    .catch((err) => {
      res.status(500).send("error update user information");
    });
});

router.delete("/:id",auth, async (req, res) => {
  const id = req.params.id;
  try{
  const hostel = await Hostel.findByIdAndRemove(id);
  if (!hostel) return res.status(404).send("degree with given id not found");
  res.send("deleted");
}
  catch(err){
    res.status(500).send('error update user information')
}
});

module.exports = router;
