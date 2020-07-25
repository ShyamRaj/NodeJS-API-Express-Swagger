import { checkIdParams, checkRequestBody } from "../../middleware/checks";
import UsersController from "./usersController";

const baseURL = '/api/v1/user';
export default [
    {
        /**
         * @swagger
         * /user?id={id}:
         *    get:
         *      tags:
         *          - User
         *      summary: Get a user by ID
         *      description: Get user information for the given id.
         *
         *      consumes:
         *        - application/json
         *
         *      parameters:
         *        - in: query
         *          name: id
         *          schema:
         *              type: integer
         *          required: true
         *
         *      responses:
         *          200:
         *            description: Returns first name and id in an object
         *            content:
         *              application/json:
         *                schema:
         *                  type: object
         *                  properties:
         *                    firstName:
         *                      type: string
         *                    lastName:
         *                      type: string
         *                    dob:
         *                      type: date
         *                    address:
         *                      type
         *
         *                example:
         *                  firstName: Some
         *                  lastName: Name
         *                  dob: "10/10/2020"
         *                  address: some address
         *          400:
         *              description: Bad request. ID must be an integer and bigger than 0.
         *          404:
         *              description: A user with the specified ID was not found.
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
         *          - User
         *      summary: This should return all the users
         *      description: This method allows you to view all the users in the DB table.
         *
         *      responses:
         *              200:
         *                description: Returns arrary of user objects
         *                content:
         *                  application/json:
         *                    schema:
         *                      type: array
         *                      items:
         *                          type: object
         *                          properties:
         *                            firstName:
         *                              type: string
         *                            lastName:
         *                              type: string
         *                            dob:
         *                              type: date
         *                            address:
         *                              type: text
         *
         *                    example:
         *                      firstName: Some
         *                      lastName: Name
         *                      dob: "10/10/2020"
         *                      address: some address
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
         * /user?id={id}:
         *    put:
         *      tags:
         *          - User
         *      summary: Update an existing user
         *
         *      parameters:
         *        - in: query
         *          name: id
         *          schema:
         *              type: integer
         *          required: true
         *
         *      requestBody:
         *        required: true
         *        content:
         *          application/json:
         *              schema:
         *                type: object
         *                properties:
         *                  firstName:
         *                    type: string
         *                  lastName:
         *                    type: string
         *                  dob:
         *                    type: date
         *                  address:
         *                    type: text
         *
         *              example:
         *               firstName: Some
         *               lastName: Name
         *               dob: "10/10/2020"
         *               address: some address
         *
         *      responses:
         *              200:
         *                description: "Record updated successfully"
         *
         */
        path: baseURL,
        method: 'put',
        handler: [
            checkRequestBody,
            UsersController.updateUserById
        ],
    },
    {
        /**
         * @swagger
         * /user:
         *    post:
         *      summary: Create a new user
         *      tags:
         *          - User
         *
         *      requestBody:
         *        required: true
         *        content:
         *          application/json:
         *              schema:
         *                type: object
         *                properties:
         *                  firstName:
         *                    type: string
         *                  lastName:
         *                    type: string
         *                  dob:
         *                    type: date
         *                  address:
         *                    type: text
         *
         *              example:
         *               firstName: Some
         *               lastName: Name
         *               dob: "10/10/2020"
         *               address: some address
         *
         *      responses:
         *              200:
         *                description: Returns first name and id in an object
         *                content:
         *                  application/json:
         *                    schema:
         *                      type: object
         *                      properties:
         *                        firstName:
         *                          type: string
         *                        lastName:
         *                          type: string
         *                        dob:
         *                          type: date
         *                        address:
         *                          type: text
         *
         *                    example:
         *                     id: "1"
         *                     firstName: Some first name
         *
         */
        path: baseURL,
        method: 'post',
        handler: [
            checkRequestBody,
            UsersController.addUser
        ]
    },
];
