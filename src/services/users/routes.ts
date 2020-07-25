
import { checkIdParams, checkRequestBody } from "../../middleware/checks";
import UsersController from "./usersController";

const baseURL = '/api/v1/user';
export default [
    {
        /**
         * @swagger
         * /user:
         *    post:
         *      tags:
         *          - User
         *      summary: This should create a user for the given payload
         *      description: This is where you can get a user details.
         *      consumes:
         *        - application/json
         *      parameters:
         *        - firstName: body
         *          in: body
         *          schema:
         *            type: object
         *            properties:
         *              flavor:
         *                type: string
         *      responses:
         *        200:
         *          description: Receive back the user for the given id.
         */
        path: baseURL,
        method: 'post',
        handler: [
            checkRequestBody,
            UsersController.addUser
        ]
    },
    {
        /**
         * @swagger
         * /user:
         *    get:
         *      tags:
         *          - User
         *      summary: This should return a user for the given id
         *      description: This is where you can get a user details.
         *      consumes:
         *        - application/json
         *      parameters:
         *        - firstName: body
         *          in: body
         *          schema:
         *            type: object
         *            properties:
         *              flavor:
         *                type: string
         *      responses:
         *        200:
         *          description: Receive back the user for the given id.
         */
        path: baseURL,
        method: 'get',
        handler: [
            checkIdParams,
            UsersController.getUserById
        ],
    },
    {
        /**
         * @swagger
         * /users:
         *    get:
         *      tags:
         *          - Users
         *      summary: This should return all the users
         *      description: This is where you can view all the users available in the DB table.
         *      consumes:
         *        - application/json
         *      responses:
         *        200:
         *          description: Receive back all the users.
         */
        path: baseURL.concat('s'),
        method: 'get',
        handler: [
            UsersController.getAllUser
        ],
    },
    {
        /**
         * @swagger
         * /user:
         *    put:
         *      tags:
         *          - User
         *      summary: This should let you update the user
         *      description: This is where you can update a given user with id.
         *      consumes:
         *        - application/json
         *      responses:
         *        200:
         *          description: User updated successfully.
         */
        path: baseURL,
        method: 'put',
        handler: [
            checkRequestBody,
            UsersController.updateUserById
        ],
    },
];
