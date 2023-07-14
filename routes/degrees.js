const auth=require('../middleware/auth');
const {Degree,validate}=require("../models/degree");
const _=require('lodash');
const express=require('express');
const router = express.Router();

router.post("/", auth,async (req, res) => {
  try{
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    const degree = new Degree(_.pick(req.body, ["Degree_Name" , "Duration"]));
    await degree.save();
  res.send(degree)
   }catch(err){
      res.status(500).send('Internal Server Error');
    }
   });

router.get("/:id",auth, async (req, res) => {
  const id = req.params.id;
  try {
    const degree = await Degree.findById(id);
    if (!degree) return res.status(404).send("id was not found");
    res.send(degree);
  } catch (err) {
    return res.status(500).send("Eroor retrieving degree");
  }
});

router.get("/",auth,async(req, res)=>{
    const degree=await Degree.find()
   res.send(degree);
})

router.put("/:id",auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    if(!req.body) return res.status(400).send({ message : "Data to update can not be empty"})
    const id=req.params.id;
    Degree.findByIdAndUpdate(id,req.body,{new:true,useFindAndModify:false})
    .then(updatedData=>{
        if(!updatedData) return res.status(404).send('canot update');
        res.send(updatedData)
        })
    .catch(err=>{
        res.status(500).send('error update user information')
    })
    })


router.delete("/:id", auth,async (req, res) => {
    const id=req.params.id;
    try{
    const degree=await Degree.findByIdAndRemove(id)
    if(!degree) return res.status(404).send('degree with given id not found');
    res.send("deleted");
    } catch(err){
        res.status(500).send('error deleting degree')
    }
});

module.exports = router;
