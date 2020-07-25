import { Request, Response } from "express";
import UsersService from "./usersService";
import { User } from "./userInterface";

// I could have written a base controller to capture all the various overall app logic and extend it to user controller
class UsersController {
    static async addUser ({ body }: Request, res: Response) {
        const reqBody: User = body;
        const result = await UsersService.addUser(reqBody);

        res.status(200).json(result);
    }

    static async getUserById ({ query }: Request, res: Response) {
        const { id } = query;
        const result = await UsersService.getUserById(Number(id));

        res.status(200).json(result);
    }

    static async getAllUser(req: Request, res: Response) {
        const result = await UsersService.getAllUsers();

        res.status(200).json(result);
    };

    static async updateUserById({ query, body }: Request, res: Response) {
        const { id } = query;
        const result = await UsersService.updateUserById(Number(id), body);

        res.status(200).json(result);
    }
}

export default UsersController;
