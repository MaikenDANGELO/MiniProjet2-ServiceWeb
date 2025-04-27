const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

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
     * /test/all:
     *  get:
     *      summary: Route publique, accessible à tous
     *      tags:
     *          - Test
     *      responses:
     *          200:
     *              description: Succès
     */
    app.get("/test/all", controller.allAccess);

    /**
     * @swagger
     * /test/user:
     *  get:
     *      summary: Route privée, accessible aux utilisateurs connectés (ayant un token)
     *      tags:
     *          - Test
     *      responses:
     *          200:
     *              description: Succès
     *          403:
     *              description: Aucun token trouvé
     *          401:
     *              descriptionm: Token non autorisé
     */
    app.get("/test/user", [authJwt.verifyToken] ,controller.userAccess);
};