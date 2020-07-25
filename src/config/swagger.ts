const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
          title: "User Management",
          version: "1.0.0",
          description:
            "A test project to understand how easy it is to document and Express API",
        },
        servers: [
          {
            url: "http://localhost:3000/api/v1"
          }
        ]
      },
    // Path to the API docs
    apis: ['**/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
