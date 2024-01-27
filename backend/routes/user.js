const express = require("express");
const router=express.Router();
const User = require("../models/user");
const bcrypt=require('bcrypt');
const jwt =require('jsonwebtoken');
router.post('/register', async (req, res) => {
  const data = req.body;

  try {
    // Vérification si l'e-mail existe déjà
    const existingUser = await User.findOne({ email: data.email });

    if (existingUser) {
      return res.status(400).json({ error: 'Cet e-mail est déjà utilisé.' });
    }

    // Si l'e-mail n'existe pas, procédez à l'enregistrement de l'utilisateur
    const newUser = new User(data);
    const salt = bcrypt.genSaltSync(10);
    const cryptedPass = await bcrypt.hashSync(data.password, salt);
    newUser.password = cryptedPass;

    await newUser.save();
    res.status(201).json({ message: 'Utilisateur enregistré avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de l\'enregistrement de l\'utilisateur.' });
  }
});
  router.post('/login' , async (req,res)=>{
    data=req.body;
    user=await User.findOne({email:data.email})
    if(!user){
         res.status(404).send('email or password invalid !')
    }else{
        validPass=bcrypt.compareSync(data.password, user.password)
        if(!validPass){
            res.status(401).send('email or password invalid !')
        }
        else{
            payload={
                _id:user._id,
                email:user.email,
                name:user.name
            }
           token=jwt.sign( payload , 'securepassword')
           res.status(200).send({mytoken: token})
        }
    }


  })
  
  router.get("/getall", async (req, res) => {
    try {
        const users = await User.find({ isAdmin: false }).populate('orders'); // Adjust the field name based on your schema
        res.send(users);
    } catch (err) {
        res.status(500).send(err.message);
    }
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