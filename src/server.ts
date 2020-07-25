import http from 'http';
import express from 'express';
import 'express-async-errors';
import { applyMiddleware, applyRoutes } from './utils';
import middleware from './middleware';
import errorHandlers from './middleware/errorHandlers';
import routes from './services';
import { initDependencies } from './config';

process.on('uncaughtException', (e) => {
    console.error({
        message: `uncaughtException`,
        extra: e,
    });
    process.exit(1);
});

process.on('unhandledRejection', (e) => {
    console.error({
        message: `unhandledRejection`,
        extra: e,
    });
    process.exit(1);
});

const router = express();
applyMiddleware(middleware, router);
applyRoutes(routes, router);
applyMiddleware(errorHandlers, router);

const { PORT = 3000 } = process.env;
const server = http.createServer(router);

async function start() {
    await initDependencies();
    server.listen(PORT, () =>
        console.info({
            message: `Server is running http://localhost:${PORT}...`,
        }),
    );
}

start();
