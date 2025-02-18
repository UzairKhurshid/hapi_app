const Joi = require('joi');
const DB = require('../config/database');

module.exports = {
    // Validation options for the POST /api/register route
    registerValidation: {
        validate: {
            payload: Joi.object({
                email: Joi.string().email().required().external(async (value) => {
                    // Check if the email already exists in the database
                    const existingUser = await DB('users').where({ email: value }).first();
                    if (existingUser) {
                        throw new Error('Email is already in use');
                    }
                    return value;
                }),
                username: Joi.string().min(3).required(), // Username must be at least 3 characters long
                role: Joi.string().required(), // Role must be a string
                password: Joi.string().min(8).required(), // Password must be at least 8 characters long
            }),
            failAction: (request, h, err) => {
                // Return validation errors in a consistent format
                return h.response({ error: err.details }).code(400).takeover();
            }
        }
    },

    // Validation options for the POST /api/login route
    loginValidation: {
        validate: {
            payload: Joi.object({
                email: Joi.string().email().required(), // Valid email
                password: Joi.string().required(), // Password required
            }),
            failAction: (request, h, err) => {
                // Return validation errors in a consistent format
                return h.response({ error: err.details }).code(400).takeover();
            }
        }
    }
};
