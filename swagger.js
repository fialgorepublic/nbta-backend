const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Documentation",
            version: "1.0.0",
        },
        servers: [
            {
                url: "http://localhost:3001/api/v1",
            },
        ],
    },
    apis: ["./routes/api/v1/*.js"], // Adjust to your route files
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
};
