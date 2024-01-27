// productRoutes.js (ou quelque chose de similaire)

const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const User = require("../models/user");

// Route pour ajouter un nouveau produit
router.post("/addproduit", async (req, res) => {
  try {
    // Récupérez les données du corps de la requête
    const { title, description, price, image } = req.body;

    // Créez une nouvelle instance de Product avec les données
    const newProduct = new Product({
      title,
      description,
      price,
      image, // Assurez-vous que "images" est un tableau d'URLs
    });

    // Enregistrez le nouveau produit dans la base de données
    const savedProduct = await newProduct.save();

    // Répondez avec le produit sauvegardé
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

  router.get("/getallproduits", (req, res) => {
    Product.find()
      .then((products) => {
        res.send(products);
      })
      .catch((err) => {
        res.send(err);
      });
  });
  router.get("/:id", async(req, res) => {
    const { id } = req.params;
    try {
       const product = await Product.findById(id);
       const similar = await Product.find({ description: product.description }).limit(5);
       res.status(200).json({ product, similar }); // Placer les données dans un objet JSON
    } catch (e) {
       res.status(400).send(e.message);
    }
 });
 
 router.get('/category/:description' , async(req,res)=>{
  let { description } = req.params;
  // Convertir la description en minuscules pour assurer une correspondance exacte
  description = description.toLowerCase();
  try {
    let product;
    if(description === "all") {
      product = await Product.find().sort([['date' , -1]]);
    } else {
      product = await Product.find({ description });
    }
    res.status(200).json(product);
  } catch(e) {
    res.status(400).send(e.message);
  }
});

  
  router.put("/updateproduit/:id", (req, res) => {
    id = req.params.id;
    newData = req.body;
    Product.findByIdAndUpdate({ _id: id }, newData)
      .then((updated) => {
        res.send(updated);
      })
      .catch((err) => {
        res.send(err);
      });
  });
  
  router.delete("/deletepro/:id", (req, res) => {
    id = req.params.id;
    Product.findOneAndDelete({ _id: id })
      .then((deleted) => {
        res.send(deleted);
      })
      .catch((err) => {
        res.send(err);
      });
  });
  
  router.post('/add-to-cart', async (req, res) => {
    const { userId, productId, price } = req.body; // Utilisez req.body pour obtenir les données du corps de la requête
    
    try {
      const user = await User.findById(userId);
      
      // Vérifiez si l'utilisateur existe
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      // Initialisez le panier de l'utilisateur s'il n'existe pas encore
      const userCart = user.cart || {};
      
      // Incrémentez la quantité du produit dans le panier
      userCart[productId] = (userCart[productId] || 0) + 1;
      
      // Incrémentez le nombre total d'articles dans le panier
      userCart.count = (userCart.count || 0) + 1;
      
      // Mettez à jour le total du panier
      userCart.total = (userCart.total || 0) + Number(price);
      
      // Mettez à jour le panier de l'utilisateur et enregistrez-le
      user.cart = userCart;
      user.markModified('cart');
      await user.save();
      
      // Répondre avec l'utilisateur mis à jour
      res.status(200).json(user);
    } catch(e) {
      res.status(400).send(e.message);
    }
  });
  
  router.post('/increase-cart', async (req, res) => {
    const { userId, productId, price } = req.body; 
    
    try {
      const user = await User.findById(userId);
      const userCart = user.cart ;
      userCart.total += Number(price) ;
      userCart.count+=1;
      userCart[productId] +=1;
    
      user.cart = userCart;
      user.markModified('cart');
      await user.save();
      res.status(200).json(user);
    } catch(e) {
      res.status(400).send(e.message);
    }
  });
  
  router.post('/decrease-cart', async (req, res) => {
    const { userId, productId, price } = req.body; 
    
    try {
      const user = await User.findById(userId);
      const userCart = user.cart ;
      userCart.total -= Number(price) ;
      userCart.count -= 1;
      userCart[productId] -= 1;
    
      user.cart = userCart;
      user.markModified('cart');
      await user.save();
      res.status(200).json(user);
    } catch(e) {
      res.status(400).send(e.message);
    }
  });

  router.post('/remove-from-cart', async (req, res) => {
    const { userId, productId, price } = req.body; 
    
    try {
      const user = await User.findById(userId);
      const userCart = user.cart ;
      userCart.total -= Number(userCart[productId]) = Number(price);
      userCart.count -= userCart[productId];
      delete userCart[productId];
      
    
      user.cart = userCart;
      user.markModified('cart');
      await user.save();
      res.status(200).json(user);
    } catch(e) {
      res.status(400).send(e.message);
    }
  });













module.exports=router;