const knex = require('../config/database'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Test Controller
const testController = async(request,h) => {
    return h.response({ message: 'Server is working' }).code(200);
}

// Register Controller
const registerController = async (request, h) => {
    try {
        const { username, email, password } = request.payload;
        
        // Check if the user already exists
        const existingUser = await knex('users').where({ email }).first();
        if (existingUser) {
            return h.response({ message: 'Username already taken' }).code(400);
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user into database
        const [user] = await knex('users').insert({ username, email, password: hashedPassword }).returning('*');

        // Return response
        return h.response({ message: 'User registered', user }).code(201);
    } catch (error) {
        return h.response({ error: error.message }).code(500);
    }
};

// Login Controller
const loginController = async (request, h) => {
    try {
        const { email, password } = request.payload;
        
        // Find the user by username
        const user = await knex('users').where({ email }).first();
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return h.response({ message: 'Invalid credentials' }).code(401);
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Return token
        return h.response({ token });
    } catch (error) {
        return h.response({ error: error.message }).code(500);
    }
};

module.exports = {
    testController,
    registerController,
    loginController
};
