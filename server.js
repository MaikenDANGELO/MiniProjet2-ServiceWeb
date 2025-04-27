const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express")
require('dotenv').config();

const app = express();
let corsOptions = {
    origin: "http://localhost:3000"
};

const swaggerSpec = swaggerJsdoc({
    swaggerDefinition: {
        openapi: "3.0.2",
        info: {
            title: "Projet2",
            version: "1.0.0",
            description: "API documentation",
            servers: [`http://localhost:${process.env.PORT ?? 3000}`],
        },
        components: {
            securitySchemes: {
                jwt: {
                    type: "http",
                    scheme: "bearer",
                    in: "header",
                    bearerFormat: "JWT"
                },
            }
        },
        security: [{
            jwt: []
        }],
    },
    apis: ["server.js", "./routes/*.js"],
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.get("/", (req,res) => {
    res.json({message: "Bienvenue dans l'application: Auth JWT"});
});

const db = require("./models");
const swaggerJSDoc = require('swagger-jsdoc');
db.sequelize.sync().then(() => {
    console.log('Database synchronized successfully');
});

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
    console.log(`Serveur écoute sur le port ${PORT}`);
});