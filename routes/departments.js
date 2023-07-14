const auth=require('../middleware/auth');
const {Department,validate}=require("../models/department");
const _=require('lodash');
const express=require('express');
const router = express.Router();

router.post("/",auth, async (req, res) => {
 try{
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const department = new Department(_.pick(req.body, ["Department_Name" , "Degree_Name"]));
  await department.save();
res.send(department)
 }catch(err){
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
 });


router.get("/:id",auth, async (req, res) => {
    const id=req.params.id;
    try {
   const department=await Department.findById(id)
   if(!department) return res.status(404).send('id was not found');
   res.send(department);
} catch(err) {return res.status(500).send('Eroor retrieving degree')
}
});

    

router.get("/",auth, async(req, res)=>{
    const department=await Department.find()
   res.send(department);
})




router.put("/:id",auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    if(!req.body){
        return res.status(400).send({ message : "Data to update can not be empty"})
    }
    const id=req.params.id;
    Department.findByIdAndUpdate(id,req.body,{new:true,useFindAndModify:false})
    .then(updatedData=>{
        if(!updatedData) return res.status(404).send('canot update');
        res.send(updatedData)
        })
    .catch(err=>{
        res.status(500).send('error update user information')
    })
    })


router.delete("/:id",auth, async (req, res) => {
    const id=req.params.id;
    try{
    const department=await Department.findByIdAndRemove(id)
    if(!department) return res.status(404).send('department with given id not found');
    res.send("deleted");
    }
    catch(err){
        res.status(500).send('error update user information')
    }
});

module.exports = router;
