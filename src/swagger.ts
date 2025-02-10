import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mainstack Assessment REST API Docs",
      version: "2.3.0",
      description: "Mainstack assessment API documentation",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    `./controller/docs/*.docs.js`,
    "./src/controller/docs/*.docs.ts",
    "*.docs.yaml",
  ],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
