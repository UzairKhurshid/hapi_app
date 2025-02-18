const Joi = require('joi'); 
const AuthController = require('../controllers/authentication');
const authValidation = require('../validations/authValidation');

module.exports = [
    {
        method:"GET",
        path:"/api/test",
        handler:AuthController.testController
    },
    {
        method: 'POST',
        path: '/api/register',
        options:authValidation.registerValidation,
        handler: AuthController.registerController,
    },
    {
        method: 'POST',
        path: '/api/login',
        options: authValidation.loginValidation,
        handler: AuthController.loginController,
    }
];