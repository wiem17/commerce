const express = require("express");
const cloudinary = require('cloudinary');
const router=express.Router();

// Configurez Cloudinary avec vos clés d'API
cloudinary.config({
    cloud_name: 'dqwc3ewbs',
    api_key:'845715758165965',
    api_secret:'tXNo6r10KdziNI2_-49KmwmJnws',
});


router.delete('/:public_id', async (req, res) => {
    const { public_id } = req.params;
    console.log('Received DELETE request for public_id:', public_id);
  
    try {
      await cloudinary.uploader.destroy(public_id);
      console.log('Image deleted successfully');
      res.status(200).send();
    } catch (e) {
      console.error('Error deleting image:', e);
      res.status(500).send(e.message);
    }
  });
  router.get('/image', async (req, res) => {
    try {
      // Récupérer la liste de toutes les ressources (images) dans Cloudinary
      const result = await cloudinary.api.resources({ type: 'upload', max_results: 100 });
  
      // Extraire les URLs des images de la réponse
      const imageUrls = result.resources.map((resource) => resource.secure_url);
  
      // Envoyer les URLs des images en réponse
      res.status(200).json({ images: imageUrls });
    } catch (error) {
      console.error('Error fetching images:', error);
      res.status(500).send(error.message);
    }
  });

module.exports = router;