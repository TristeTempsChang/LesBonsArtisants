var product = require('../models/productModel');

exports.getProduct = function(req,res) {
    product.find()
         .then(product => {
            console.log(product);
            res.status(200).json({ success: true, message: "Le produit a été trouvé avec succès", data: product }).status(200);
         })
         .catch(err => {
            res.status(500).json({ success: false, message: err });
         });
}