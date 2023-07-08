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
};

exports.postUser = function(req, res) {
    var user = new Users();

    user.email = req.body.email;
    user.username = req.body.username;
    user.password = req.body.password;

    user.save()
        .then(savedUser => {
            res.status(200).json({ success: true, message: "L'utilisateur a été créé avec succès", data: savedUser }).status(200);
        })
        .catch(err => {
            res.status(500).json({ success: false, message: err });
        });
};

exports.login = function(req, res) {
    Users.findOne({ email: req.body.email })
        .then(user => {
            console.log(user)
            if (!user) {
                return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
            }
            if (req.body.password !== user.password) {
                return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
            }
            res.status(200).json({
                userId: user._id,
                token: 'TOKEN'
            });
        })
        .catch(error => res.status(500).json({ error }));
};