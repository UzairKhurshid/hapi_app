const bcrypt = require('bcrypt');
const DB = require('../config/database'); // Import the DB instance

exports.seed = async function () {
  // Deletes ALL existing entries
  await DB('users').del();

  // Hash the password
  const hashedPassword = await bcrypt.hash('uzair@123', 10);

  // Inserts seed entries with hashed password
  await DB('users').insert([
    { 
      username: "Uzair Khurshid", 
      email: "uzairkhurshid12@gmail.com", 
      role: "admin",
      avatar:"",
      password: hashedPassword // Insert the hashed password
    }
  ]);
};
