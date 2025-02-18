const UserController = require('../controllers/user');
const userValidation = require('../validations/userValidation'); // Import the validation schemas

module.exports = [
    {
        method: 'GET',
        path: '/api/users',
        options:userValidation.fetchAllUsersValidation,
        handler: UserController.fetchAllUsers,
    },
    {
        method: 'GET',
        path: '/api/users/{id}',
        options: userValidation.getUserByIdValidation,
        handler: UserController.fetchUserById,
    },
    {
        method: 'POST',
        path: '/api/users',
        options: userValidation.createUserValidation,
        handler: UserController.createUser,
    },
    {
        method: 'PUT',
        path: '/api/users/{id}',
        options: userValidation.updateUserOptions,
        handler: UserController.updateUser,
    },
    {
        method: 'DELETE',
        path: '/api/users/{id}',
        options: userValidation.deleteUserValidation,
        handler: UserController.deleteUser,
    }
];
