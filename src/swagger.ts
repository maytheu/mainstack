import { Application, Express, Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mainstack Assessment REST API Docs",
      version: "2.3.0",
      description: "Mainstack assessment tha provide ......",
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
    "./src/controller/docs/*.docs.ts",
    "./src/controller/docs/*.docs.yaml",
  ],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
