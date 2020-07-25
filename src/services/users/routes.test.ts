import http from 'http';
import express from 'express';
import supertest from "supertest";
import { applyMiddleware, applyRoutes } from '../../utils';
import middleware from '../../middleware';
import errorHandlers from '../../middleware/errorHandlers';
import routes from '../../services/users/routes';

const router = express();
applyMiddleware(middleware, router);
applyRoutes(routes, router);
applyMiddleware(errorHandlers, router);

const request = supertest(router);

describe('validate user api routes ', () => {
    afterAll(async () => {
        await new Promise(resolve => setTimeout(() => resolve(), 10000)); // avoid jest open handle error
    });

    test('/GET /api/v1/users | get all the users', () => {
        request
            .get('/api/v1/users')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);
    });

    test('/GET /api/v1/user | a valid id in query string', () => {
        request
            .get('/api/v1/user')
            .query({ id: '1' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect({ firstname: "a" })
            .expect(200);
    });

    test('/POST /api/v1/user | a valid create user request', () => {
        const data = {
            firstName: 'A',
            lastName: 'B',

        };
        request
            .post('/api/v1/user')
            .send(data)
            .expect('Content-Type', /json/)
            .expect({ id: '1', firstname: "a" })
            .expect(200);
    });

    test('/POST /api/v1/user | a valid create user request', () => {
        const data = {
            firstName: 'A',
            lastName: 'B',
            dob: 'C',
            address: 'DEFGH',

        };
        request
            .post('/api/v1/user')
            .send(data)
            .expect('Content-Type', /json/)
            .expect(200);
    });

    test('/PUT /api/v1/user | a valid update user request', () => {
        const data = {
            firstName: 'C'
        };
        request
            .put('/api/v1/user')
            .query({ id: '1' })
            .send(data)
            .expect('Content-Type', /json/)
            .expect(200);
    });

    test('/PUT /api/v1/user | a valid update user request', () => {
        const data = {
            firstName: 'C',
            lastName: 'B',
            dob: 'C',
            address: 'DEFGH',
        };
        request
            .put('/api/v1/user')
            .query({ id: '1' })
            .send(data)
            .expect('Content-Type', /json/)
            .expect(200);
    });

    // Negative test cases, this will produce a lot of junk in the cmd line when running tests
    test('a non-existing api method', async () => {
        const response = await request.get('/api/v11/user');
        expect(response.status).toEqual(404);
    });

    test('an empty string', async () => {
        const response = await request.get('/api/v1/user?id');
        expect(response.status).toEqual(400);
    });
});
