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

exports.postProduct = function(req, res) {
   var prod = new product();

   prod.name = req.body.name;
   prod.type = req.body.type;
   prod.price = req.body.price;
   prod.rating = req.body.rating;
   prod.warranty_years = req.body.warranty_years;
   prod.available = req.body.available;

   prod.save()
       .then(savedProd => {
           res.status(200).json({ success: true, message: "Le produit a été ajouté avec succès", data: savedProd }).status(200);
       })
       .catch(err => {
           res.status(500).json({ success: false, message: err });
       });
};

exports.deleteProduct = function(req,res) {
   product.findByIdAndRemove(req.params.prod_id)
   .catch(err => {
    res.status(500).json({ success: false, message: err });
   })
   res.status(200).json({ success: true, message: "Le produit a été supprimé avec succès"}).status(200);
}

exports.updateProduct = function(req,res) {
   product.findById(req.params.prod_id)
   .then(products => {
       if(req.body.name) { products.name = req.body.name}
       if(req.body.type) { products.type = req.body.type}
       if(req.body.price) { products.price = req.body.price}
       if(req.body.rating) { products.rating = req.body.rating}
       if(req.body.warranty_years) { products.warranty_years = req.body.warranty_years}
       if(req.body.available) { products.available = req.body.available}
   products.save()
       .then(savedModifProduct => {
           res.status(200).json({ success: true, message: "Le produit a été modifé avec succès", data: savedModifProduct }).status(200);
       })
       .catch(err => {
           res.status(500).json({ success: false, message: err });
       });
   })
   .catch(err => {
      res.status(500).json({ success: false, message: err });
   });
}

exports.getProdById = function(req,res) {
   product.findById(req.params.prod_id)
        .then(products => {
           res.status(200).json({ success: true, message: "L'utilisateur a été trouvé avec succès", data: products }).status(200);
        })
        .catch(err => {
           res.status(500).json({ success: false, message: err });
        });
}