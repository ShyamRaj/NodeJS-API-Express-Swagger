import { Router } from 'express';
const swaggerUi = require("swagger-ui-express");

// @ts-ignore
import swaggerSpec from './../config/swagger';

export const handleAPIDocs = (router: Router) => {
    router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
