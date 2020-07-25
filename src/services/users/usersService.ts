import { dbClient } from "../../config/db";
import format from 'pg-format';
import { User } from "./userInterface";
import { Users } from "./usersInterface";

class UserService {
    static async addUser(user: User) {
        const { firstName, lastName, dob, address } = user;

        const { rows } = await dbClient.query(format(
            // I could have moved all the queries to DAL or use an ORM for easier maintanence, But due to time constraint i'm leaving it here
            'INSERT INTO demo.users (firstName, lastName, dob, address) VALUES (%L) RETURNING id, firstName;',
            [firstName, lastName, dob, address]
            )
        );

        return rows[0];
    };

    static async getUserById(id: number) {
        const { rows } = await dbClient.query(format(
            'SELECT firstName, lastName, dob, address FROM demo.users WHERE id = %L',
            [id]
            )
        );

        return rows[0] || 'User not found';
    };

    static async getAllUsers() {
        const { rows } = await dbClient.query(
            'SELECT id, firstName, lastName, dob, address FROM demo.users'
        );
        const results: Users = rows;

        return results || 'No records found!';
    };

    static async updateUserById(id: number, user: User) {
        const generateSetQuery = (key: keyof User) => user[key] === (null || undefined) ? null : format('%s = %L', key, user[key]);
        const setConditions = [
            generateSetQuery('firstName'),
            generateSetQuery('lastName'),
            generateSetQuery('dob'),
            generateSetQuery('address')
        ]
            .filter(r => r)
            .join(', ');

        const result = await dbClient.query(format(
            'UPDATE demo.users SET %s WHERE id = %L',
            setConditions, id
            )
        );

        if (result.rowCount > 0) {
          return 'Record updated successfully';
        }

        return 'Record updated failed';
    };
}

export default UserService;
