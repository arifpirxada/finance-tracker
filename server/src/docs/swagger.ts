import swaggerJSDoc from 'swagger-jsdoc';
import config from 'config';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API for Expense Flux Finance Tracker',
            version: '1.0.0',
            description: 'This page contains swagger docs for Expense Flux API generated with the help of swagger-jsdoc'
        },
        servers: [
            {
                url: `http://localhost:${config.port}`,
                description: 'Local dev server'
            }
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        email: { type: 'string' },
                        name: { type: 'string' },
                    },
                },
            },
        },
        security: [{ BearerAuth: [] }],
    },
    apis: ["apps/**/api/*.ts"]
}

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;