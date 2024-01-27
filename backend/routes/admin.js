const express = require("express");
const router=express.Router();
const Admin = require("../models/admin");
const bcrypt=require('bcrypt');
const jwt =require('jsonwebtoken');
router.post('/register', async (req, res) => {
    const data = req.body;

    try {
      // Vérification si l'e-mail existe déjà
      const existingAdmin = await Admin.findOne({ username: data.username });
  
      if (existingAdmin) {
        return res.status(400).json({ error: 'Cet username est déjà utilisé.' });
      }
  
      // Si l'e-mail n'existe pas, procédez à l'enregistrement de l'utilisateur
      const newAdmin = new Admin(data);
      const salt = bcrypt.genSaltSync(10);
      const cryptedPass = await bcrypt.hashSync(data.password, salt);
      newAdmin.password = cryptedPass;
  
      await newAdmin.save();
      res.status(201).json({ message: 'Admin enregistré avec succès.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de l\'enregistrement de l\admin.' });
    }
  });
    
  router.post('/login' , async (req,res)=>{
    data=req.body;
    admin=await Admin.findOne({username:data.username})
    if(!admin){
         res.status(404).send('username or password invalid !')
    }else{
        validPass=bcrypt.compareSync(data.password, admin.password)
        if(!validPass){
            res.status(401).send('username or password invalid !')
        }
        else{
            payload={
                _id:admin._id,
                username:admin.username
               
            }
           token=jwt.sign( payload , 'securepassword')
           res.status(200).send({mytoken: token})
        }
    }


  })
  
  router.get("/getall", (req, res) => {
    User.find()
      .then((users) => {
        res.send(users);
      })
      .catch((err) => {
        res.send(err);
      });
  });
  router.get("/getbyid/:id", (req, res) => {
    myid = req.params.id;
    User.findOne({ _id: myid })
      .then((users) => {
        res.send(users);
      })
      .catch((err) => {
        res.send(err);
      });
  });
  
  router.put("/update/:id", (req, res) => {
    id = req.params.id;
    newData = req.body;
    User.findByIdAndUpdate({ _id: id }, newData)
      .then((updated) => {
        res.send(updated);
      })
      .catch((err) => {
        res.send(err);
      });
  });
  
  router.delete("/delete/:id", (req, res) => {
    id = req.params.id;
    User.findOneAndDelete({ _id: id })
      .then((deletedUser) => {
        res.send(deletedUser);
      })
      .catch((err) => {
        res.send(err);
      });
  });
  
  
module.exports=router;