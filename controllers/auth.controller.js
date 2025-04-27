const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const RefreshToken = db.refreshToken;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = (req,res) => {
    User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailId: req.body.emailId,
        password: bcrypt.hashSync(req.body.password, 12),
    }).then(user => {
        res.send({message: "L'utilisateur a été enregistré avec succès"});
    }).catch(err => {
        res.status(500).send({message: err.message});
    })
}

exports.signin = (req,res) => {
    User.findOne({
        where: {
            emailId: req.body.emailId
        }
    }).then(async (user) => {
        if (!user) {
            return res.status(404).send({message: "Utilisateur non trouvé"});
        }
        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if(!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Mot de passe incorrect",
            });
        }
        let token = jwt.sign({id: user.id}, config.secret, {
            expiresIn: config.jwtExpiration,
        });
        let refreshToken = await RefreshToken.createToken(user);
        res.status(200).send({
            id: user.id,
            username: user.emailId,
            accessToken: token,
            refreshToken: refreshToken,
        });
    }).catch(err => {
        res.status(500).send({message: err.message});
    });
};

exports.refreshToken = async (req, res) => {
    const { refreshToken: requestToken } = req.body;
    console.log(req.body)
    if(requestToken == null) {
        console.log("token non renseigné")
        return res.status(403).json({message: "Le refreshToken est requis"});
    }
    try {
        let refreshToken = await RefreshToken.findOne({where: {token: requestToken }});
        if(!refreshToken) {
            console.log("token inexistant")
            return res.status(403).json({message: "RefreshToken non existand dans la BDD"});
        }
        if(RefreshToken.verifyExpiration(refreshToken)) {
            console.log("token expiré")
            RefreshToken.destroy({where: {id: refreshToken.id }});
            return res.status(403).json({
                message: "Le jeton d'actualisation a expiré. Veuillez vous reconnecter."
            })
        }
        const user = await refreshToken.getUser();
        let newAccessToken = jwt.sign({id: user.id }, config.secret, {
            expiresIn: config.jwtExpiration,
        });
        return res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: refreshToken.token,
        });
    } catch (err) {
        return res.status(500).sesnd({message: err});
    }
};