import swaggerJsDoc from "swagger-jsdoc";

export const swaggerOptions: swaggerJsDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API Documentation",
    },
    servers: [
      {
        url: "http://localhost:3056/api",
      },
    ],
  },
  apis: ["src/routes/**/*.ts", "src/controllers/**/*.ts"],
};

export const swaggerDocs = swaggerJsDoc(swaggerOptions);
