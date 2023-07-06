var Users = require('../models/userModel');

exports.getUser = function(req,res) {
    Users.find()
         .then(users => {
            console.log(users);
            res.status(200).json({ success: true, message: "L'utilisateur a été trouvé avec succès", data: users }).status(200);
         })
         .catch(err => {
            res.status(500).json({ success: false, message: err });
         });
}