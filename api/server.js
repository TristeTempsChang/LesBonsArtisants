const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require("body-parser");

var productController = require("./controllers/productControllers.js");
var userController = require("./controllers/userControllers.js");

const app = express();

mongoose.connect('mongodb+srv://admin:admin@cluster0.idkzese.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

var port = process.env.PORT || 4200;

var router = express.Router();

router.route('/product')
    .get(productController.getProduct)
    .post(productController.postProduct)

router.route('/productById/:prod_id')
    .get(productController.getProdById)
    .post(productController.updateProduct)
    .delete(productController.deleteProduct)

router.route('/user')
    .get(userController.getUser)
    .post(userController.postUser)

router.route('/login')
    .post(userController.login)

app.use('/api', router);

app.listen(port, () => {
    console.log('le serveur a démarré !')
})