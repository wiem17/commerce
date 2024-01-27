const express = require("express");
const cors = require("cors");
const adminRoute = require('./routes/admin');
const productRoute = require('./routes/product');
const userRoute = require('./routes/user');
const imageRoute = require('./routes/images');
require("./config/connect");

const app = express();

// Configuration CORS spécifique
app.use(cors({
  origin: 'http://localhost:3000', // Remplacez par l'URL de votre application React
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
  allowedHeaders: 'Content-Type,Authorization',
}));

app.use(express.json());
app.use('/product', productRoute);
app.use('/user', userRoute);
app.use('/admin', adminRoute);
app.use('/images', imageRoute);
app.use('/getimage', express.static('./uploads'));

app.listen(3001, () => {
  console.log("server work");
});
