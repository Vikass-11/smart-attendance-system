import { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const options: any = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Smart Attendance API',
      version: '1.0.0',
      description: 'API documentation for the Smart Attendance System',
    },
    servers: [{ url: '/api', description: 'Local API' }],
  },
  // Scan source files for JSDoc/OpenAPI annotations (controllers and routes)
  apis: ['./src/controllers/*.ts', './src/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Application) => {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwagger;
