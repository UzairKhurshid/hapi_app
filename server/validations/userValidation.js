const Joi = require('joi');
const DB = require('../config/database');

const validateAdminRole = async (request, h) => {
    if (request.auth.credentials.role !== 'admin') {
        return h.response({ message: 'Forbidden: Admins only' }).code(403);
    }
    return h.continue; // Proceed if the role is admin
};

const emailSchema = Joi.string().email();

const validateUniqueEmail = async (value) => {
    const user = await DB('users').where({ email: value }).first();
    if (user) {
        throw new Error('Email is already taken');
    }
    return value;
};

module.exports = {

    // Validation options for the GET /api/users route
    fetchAllUsersValidation: {
        auth: 'jwt', // Require JWT authentication
        validate: {
            query: Joi.object({
                page: Joi.number().integer().min(1).default(1), // Default page is 1 and must be greater than or equal to 1
                limit: Joi.number().integer().min(1).max(100).default(10), // Default limit is 10, max limit is 100
                search: Joi.string().optional().allow(''), // Optional search string, can be an empty string
            }),
            failAction: (request, h, err) => {
                return h.response({ error: err.details }).code(400).takeover();
            }
        }
    },

    // Validation options for the GET /api/users/{id} route
    getUserByIdValidation: {
        auth: 'jwt', // Require JWT authentication
        validate: {
            params: Joi.object({
                id: Joi.number().integer().required() // Validate that 'id' is a required integer
            }),
            failAction: (request, h, err) => {
                return h.response({ error: err.details }).code(400).takeover();
            }
        }
    },

    // Validation options for the POST /api/users route 
    createUserValidation: {
        auth: 'jwt', // Require JWT authentication
        validate: {
            payload: Joi.object({
                username: Joi.string().min(3).required(), // Required username with min length of 3
                password: Joi.string().min(8).required(), // Required password with min length of 8
                role: Joi.string().optional(), // Optional role
                avatar: Joi.string().optional(), // Optional avatar
                email: emailSchema.required(),
            }).external(async (payload) => {
                if (payload.email) {
                    await validateUniqueEmail(payload.email);
                }
                return payload;
            }),
            failAction: (request, h, err) => {
                return h.response({ error: err.details }).code(400).takeover();
            }
        },
        pre: [validateAdminRole], // Ensures only admins can create users
    },

    // Validation options for the PUT /api/users/{id} route
    updateUserOptions: {
        auth: 'jwt', // Require JWT authentication
        validate: {
            params: Joi.object({
                id: Joi.number().integer().required() // Validate that 'id' is a required integer
            }),
            payload: Joi.object({
                username: Joi.string().min(3).optional(), // Optional username with min length of 3
                password: Joi.string().min(8).optional(), // Optional password with min length of 8
                role: Joi.string().optional(), // Optional role
                avatar: Joi.string().optional(), // Optional avatar
                email: Joi.string().email().optional().custom(async (value, helpers) => {
                    if (value) {
                        // Check if the email is unique
                        const user = await DB('users').where({ email: value }).first();
                        if (user) {
                            throw new Error('Email is already taken');
                        }
                    }
                    return value;
                }, 'Email uniqueness validation'),
            }),
            failAction: (request, h, err) => {
                return h.response({ error: err.details }).code(400).takeover();
            }
        },
        pre: [validateAdminRole],
    },

    // Validation options for the DELETE /api/users/{id} route
    deleteUserValidation: {
        auth: 'jwt', // Require JWT authentication
        validate: {
            params: Joi.object({
                id: Joi.number().integer().required() // Valdate that 'id' is a required integer
            }),
            failAction: (request, h, err) => {
                return h.response({ error: err.details }).code(400).takeover();
            }
        },
        pre: [validateAdminRole]
    }
};
