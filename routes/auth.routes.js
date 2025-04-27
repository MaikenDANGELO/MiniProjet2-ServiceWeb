const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
const swaggerJSDoc = require("swagger-jsdoc");
module.exports = function(app) {
    app.use(function(req,res,next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    /**
     * @swagger
     * /auth/signup:
     *  post:
     *      summary: Inscription utilisateur, vérifie que l'utilisateur n'existe pas déjà (email)
     *      tags:
     *          - Auth
     *      requestBody:
     *          required: true
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      required:
     *                          - firstName
     *                          - lastName
     *                          - emailId
     *                          - password
     *                      properties:
     *                          firstName:
     *                              type: string
     *                              example: "John"
     *                          lastName:
     *                              type: string
     *                              example: "Smith"
     *                          emailId:
     *                              type: string
     *                              format: email
     *                              example: "john.smith@example.com"
     *                          password:
     *                              type: string
     *                              format: password
     *                              example: "iAm!aStr0nG?P4sSW0rD>w<!"
     *      responses:
     *          200:
     *              description: Succès
     *          500:
     *              description: Échec
     *          400:
     *              description: Email déjà utilisé
     */
    app.post("/auth/signup", [verifySignUp.checkDuplicateUsername,], controller.signup);

    /**
     * @swagger
     * /auth/signin:
     *  post:
     *      summary: Connexion utilisateur, vérifie existence utilisateur, vérifie correspondance mdp
     *      tags:
     *          - Auth
     *      requestBody:
     *          required: true
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      required:
     *                          - emailId
     *                          - password
     *                      properties:
     *                          emailId:
     *                              type: string
     *                              format: email
     *                              example: "john.smith@example.com"
     *                          password:
     *                              type: string
     *                              format: password
     *                              example: "iAm!aStr0nG?P4sSW0rD>w<!"
     *      responses:
     *          200:
     *              description: Succès
     *          401:
     *              description: Mot de passe incorrect
     *          404:
     *              description: Utilisateur non trouvé
     *          500:
     *              description: Échec
     */
    app.post("/auth/signin", controller.signin)


    /**
     * @swagger
     * /auth/refreshtoken:
     *  post:
     *      summary: Vérifie la validité du refreshtoken et si valide renvoi un nouveau accessToken, sinon erreur
     *      tags:
     *          - Auth
     *      requestBody:
     *          required: true
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      required:
     *                          - refreshToken
     *                      properties:
     *                          refreshToken:
     *                              type: string
     *                              example: "616cf669-305a-4dc6-82bc-7bb16588c3d3"
     *      responses:
     *          200:
     *              description: Succès
     *          403:
     *              description: Token invalide
     *          500:
     *              description: Échec
     */
    app.post("/auth/refreshtoken", controller.refreshToken);
}