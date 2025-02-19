const bcrypt = require('bcrypt');
const knex = require('../config/database'); // Import Knex instance
const userHelper = require('../helpers/user')

const fetchAllUsers = async (request, h) => {
    try {
        // Extract pagination and search query parameters
        const { page = 1, limit = 10, search = '' } = request.query;
        const offset = (page - 1) * limit;

         let query = knex('users').select('*');

        // Apply search filter if search term is proBided
        if (search) {
            query = query.where('username', 'ilike', `%${search}%`) // Filter by username (you can add other fields like email)
                         .orWhere('email', 'ilike', `%${search}%`);
        }

        // Apply pagination (limit and offset)
        query = query.limit(limit).offset(offset);

        // Fetch the users
        const users = await query;

        // Count the total number of records for pagination purposes
        const totalUsers = await knex('users').count('* as total');

        // Calculate total pages
        const totalPages = Math.ceil(totalUsers[0].total / limit);

        // Return paginated and filtered users
        return h.response({
            page: parseInt(page),
            totalPages: totalPages,
            totalUsers: totalUsers[0].total,
            users: users,
        });
    } catch (error) {
        return h.response({ error: error.message }).code(500);
    }
};

// Fetch User By Id
const fetchUserById = async (request, h) => {
    try {
        // Query a specific user by ID
        const user = await knex('users').where({ id: request.params.id }).first();
        if (!user) return h.response({ message: 'User not found' }).code(404);
        return h.response(user);
    } catch (error) {
        return h.response({ error: error.message }).code(500);
    }
};

// Create User
const createUser = async (request, h) => {
    try {
        const { username, email, role, avatar, password } = request.payload;
        console.log(request.payload)
        // Check if email is already taken
        const existingUser = await knex('users').where({ email }).first();
        if (existingUser) {
            return h.response({ message: 'Email is already in use' }).code(400);
        }

        // Hash password before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user into database
        const newUser = await knex('users')
            .insert({
                username,
                email,
                role: role || 'user', // Default role is 'user' if not provided
                avatar,
                password: hashedPassword
            })
            .returning('*'); // Return newly created user

        return h.response({ message: 'User created successfully', user: newUser[0] }).code(201);
    } catch (error) {
        return h.response({ error: error.message }).code(500);
    }
};

// Update User
const updateUser = async (request, h) => {
    try {
        const { role } = request.auth.credentials; // Extract role from JWT token

        if (role !== 'admin') {
            return h.response({ message: 'Forbidden: Only admins can delete users' }).code(403);
        }
            
        const { password, ...updateFields } = request.payload; // Extract password separately
        if (password) {
            updateFields.password = await bcrypt.hash(password, 10); // Hash password if provided
        }

        // Remove any undefined fields from the update object
        const validUpdates = Object.fromEntries(
            Object.entries(updateFields).filter(([_, value]) => value !== undefined)
        );

        if (Object.keys(validUpdates).length === 0) {
            return h.response({ message: 'No valid fields provided for update' }).code(400);
        }

        // Update user with only provided fields
        const updatedUser = await knex('users')
            .where({ id: request.params.id })
            .update(validUpdates)
            .returning('*'); // Return updated user

        if (!updatedUser.length) {
            return h.response({ message: 'User not found' }).code(404);
        }

        return h.response(updatedUser[0]); // Return updated user data
    } catch (error) {
        return h.response({ error: error.message }).code(500);
    }
};

// Delete User
const deleteUser = async (request, h) => {
    try {
        const { role } = request.auth.credentials; // Extract role from JWT token

        if (role !== 'admin') {
            return h.response({ message: 'Forbidden: Only admins can delete users' }).code(403);
        }
        // Find the user to ensure they exist before deleting
        const user = await knex('users').where({ id: request.params.id }).first();
        if (!user) {
            return h.response({ message: 'User not found' }).code(404);
        }

        // Delete the user
        await knex('users').where({ id: request.params.id }).del();
        return h.response({ message: 'User deleted' }).code(200);
    } catch (error) {
        return h.response({ error: error.message }).code(500);
    }
};

// Upload File
const uploadFile = async (request, h) => {
    try {
        const file = request.payload.file;
        const fileUrl = await userHelper.uploadFileToS3(file)

        return h.response({
            message: 'File uploaded successfully',
            fileUrl: fileUrl,
        }).code(200);
    } catch (error) {
        return h.response({
            message: error.message,
        }).code(500);
    }
};

module.exports = {
    fetchAllUsers,
    fetchUserById,
    createUser,
    updateUser,
    deleteUser,
    uploadFile
};
