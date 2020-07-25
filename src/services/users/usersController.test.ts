import UsersController from "./usersController";
import UserService from "./usersService";

jest.mock('./usersService.ts', () => ({
    getAllUsers: jest.fn(),
    getUserById: jest.fn(),
    addUser: jest.fn(),
    updateUserById: jest.fn()
}));

const mockRequest = (query = {}, body = {}) => {
        let req = {
            body: jest.fn().mockReturnValue(body),
            query: jest.fn().mockReturnValue(query)
        };

        return req;
    };

const mockResponse = (code = {}, body = {}) => {
        let res = {
            send: jest.fn().mockReturnValue({}),
            status: jest.fn().mockReturnValue(code),
            json: jest.fn().mockReturnValue(body)
        };

        return res;
    };

describe('UsersController', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    test('Get all users should call user service and return a result', () => {
        const response = mockResponse(200, { firstname: "S", lastname: "R" });
        // @ts-ignore
        UsersController.getAllUser(mockRequest(), response);

        expect(UserService.getAllUsers).toBeCalled();
        expect(response.status()).toEqual(200);
        expect(response.json()).toEqual({ firstname: "S", lastname: "R" });
    });

    test('Get user by id should call user service and return a result', () => {
        const response = mockResponse(200, { firstname: "S", lastname: "R" });
        const request = mockRequest({ id: '1' });
        // @ts-ignore
        UsersController.getUserById(request, response);

        expect(UserService.getUserById).toBeCalled();
        expect(response.status()).toEqual(200);
        expect(response.json()).toEqual({ firstname: "S", lastname: "R" });
    });

    test('POST / Create a user should call user service and return a result', () => {
        const response = mockResponse(200, { id: '2', firstName: "C" });
        const request = mockRequest({}, {
            firstName: 'C',
            lastName: 'B',
            dob: 'C',
            address: 'DEFGH',
        });
        // @ts-ignore
        UsersController.addUser(request, response);

        expect(UserService.addUser).toBeCalled();
        expect(response.status()).toEqual(200);
        expect(response.json()).toEqual({ id: '2', firstName: "C" });
    });

    test('PUT / Update a user should call user service and return a result', () => {
        const response = mockResponse(200, { id: '2', firstName: "C" });
        const request = mockRequest({}, {
            firstName: 'C',
            lastName: 'B',
            dob: 'C',
            address: 'DEFGH',
        });
        // @ts-ignore
        UsersController.updateUserById(request, response);

        expect(UserService.updateUserById).toBeCalled();
        expect(response.status()).toEqual(200);
        expect(response.json()).toEqual({ id: '2', firstName: "C" });
    });
});
