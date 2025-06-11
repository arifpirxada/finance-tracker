import swaggerJSDoc from 'swagger-jsdoc';
import config from 'config';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API for Expense Flux Finance Tracker',
      version: '1.0.0',
      description:
        'This page contains swagger docs for Expense Flux API generated with the help of swagger-jsdoc',
    },
    servers: [
      {
        url: `http://localhost:${config.port}`,
        description: 'Local dev server',
      },
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
            id: {
              type: 'string',
              example: '648fa64c2b5a87d7b4123a9e',
            },
            name: {
              type: 'string',
              example: 'John William',
            },
            email: {
              type: 'string',
              example: 'john@example.com',
            },
            accounts: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  _id: {
                    type: 'string',
                    example: '6846977fad04baa0c527d',
                  },
                  name: {
                    type: 'string',
                    example: 'Saving',
                  },
                  type: {
                    type: 'string',
                    enum: ['Cash', 'Bank account', 'Other'],
                    example: 'Bank account',
                  },
                  balance: {
                    type: 'number',
                    example: 3147,
                  },
                },
              },
            },
            currency: {
              type: 'string',
              example: 'INR',
            },
          },
        },
        RegisterInput: {
          type: 'object',
          required: ['name', 'email', 'password', 'currency'],
          properties: {
            name: {
              type: 'string',
              example: 'John William',
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'test@example.com',
            },
            password: {
              type: 'string',
              format: 'password',
              example: 'StrongPassword123!',
            },
            accounts: {
              type: 'array',
              items: {
                type: 'object',
                required: ['name', 'type', 'balance'],
                properties: {
                  name: {
                    type: 'string',
                    example: 'Saving',
                  },
                  type: {
                    type: 'string',
                    enum: ['Cash', 'Bank account', 'Other'],
                    example: 'Bank account',
                  },
                  balance: {
                    type: 'number',
                    example: 1000,
                  },
                },
              },
              example: [
                {
                  name: 'Saving',
                  type: 'Bank account',
                  balance: 1000,
                },
              ],
            },
            currency: {
              type: 'string',
              example: 'INR',
            },
          },
        },
        LoginInput: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'test@example.com',
            },
            password: {
              type: 'string',
              format: 'password',
              example: 'StrongPassword123!',
            },
          },
        },
        Account: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'Saving',
            },
            type: {
              type: 'string',
              enum: ['Cash', 'Bank account', 'Other'],
              example: 'Bank account',
            },
            balance: {
              type: 'number',
              example: 3147,
            },
          },
        },
        ValidationError: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Validation error' },
            issues: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  code: { type: 'string', example: 'invalid_type' },
                  expected: { type: 'string', example: 'string' },
                  received: { type: 'string', example: 'number' },
                  path: {
                    type: 'array',
                    items: { type: 'string' },
                    example: ['name'],
                  },
                  message: {
                    type: 'string',
                    example: 'Expected string, received number',
                  },
                },
              },
            },
          },
        },
        ServerError: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Something went wrong. Please try again later.' },
          }
        }
      },
    },

    security: [{ BearerAuth: [] }],
  },
  apis: ['src/apps/**/api/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default function setupSwagger(app: Express) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
