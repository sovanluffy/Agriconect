import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API AGRICONECT',
      version: '1.0.0',
      description: 'Swagger documentation example',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local server',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT', // optional, for clarity
        },
      },
    },
    security: [
      {
        BearerAuth: [], // Apply globally to all routes that support it
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // your route files
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
