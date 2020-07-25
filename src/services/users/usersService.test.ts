import UserService from "./usersService";
import { dbClient } from "../../config/db";

jest.mock('../../config/db');
const mockData = [
    {
        firstName: 'A',
        lastName: 'B',
        dob: new Date('10/10/2010'),
        address: 'DEFGH',
    },
    {
        firstName: 'C',
        lastName: 'B',
        dob: new Date('10/10/2010'),
        address: 'DEFGH',
    }
];

describe('Users Service', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should call get all users query and return no records as result', async () => {
        // @ts-ignore
        dbClient.query.mockImplementation(() => ({rows: 'No records found!'}));
        const result = await UserService.getAllUsers();

        expect(dbClient.query).toBeCalled();
        expect(result).toEqual('No records found!');
    });

    test('should call get all users query and return a result', async () => {
        // @ts-ignore
        dbClient.query.mockImplementation(() => ({ rows: mockData }));
        const result = await UserService.getAllUsers();

        expect(dbClient.query).toBeCalled();
        expect(result).toEqual(mockData);
    });

    test('should call get user by id query and return "No user found"', async () => {
        // @ts-ignore
        dbClient.query.mockImplementation(() => ({ rows: [null] }));
        const result = await UserService.getUserById(1);

        expect(dbClient.query).toBeCalled();
        expect(result).toEqual("User not found");
    });

    test('should call get user by id query and return a result', async () => {
        // @ts-ignore
        dbClient.query.mockImplementation((query) => ({ rows: mockData }));
        const result = await UserService.getUserById(1);

        expect(dbClient.query).toBeCalled();
        expect(result).toEqual(mockData[0]);
    });

    test('should call create user query and return a result', async () => {
        // @ts-ignore
        dbClient.query.mockImplementation((query) => ({ rows: mockData }));
        // @ts-ignore
        const result = await UserService.addUser(mockData[0]);

        expect(dbClient.query).toBeCalled();
        expect(result).toEqual(mockData[0]);
    });

    test('should call update user query and return a result', async () => {
        const data = { firstName: 'S' };
        // @ts-ignore
        dbClient.query.mockImplementation((query) => ({ rowCount: 1, rows: [data] }));
        const result = await UserService.updateUserById(1, data);

        expect(dbClient.query).toBeCalled();
        expect(result).toEqual("Record updated successfully");
    });
});
