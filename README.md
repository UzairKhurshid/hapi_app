# Overview
This is a RESTful API built using Hapi.js and Knex.js with PostgreSQL. The project follows a modular structure with authentication using JWT and request validation via Joi.

# Project Structure.
├── server/                 
│   ├── config/             
│   ├── controllers/        
│   ├── helpers/            
│   ├── migrations/         
│   ├── plugins/            
│   ├── routes/             
│   ├── validations/        
│   ├── knexfile.js         
│   ├── server.js           
├── .env                    
├── Dockerfile              
├── docker-compose.yml      
├── package.json            
├── package-lock.json       

# Installation
PrerequisitesNode.js (>= 14)

PostgreSQL

Knex

Docker (optional, for containerized setup)

# Setup
Clone the repository:
git clone https://github.com/UzairKhurshid/hapi_app.git

cd project_1

Install dependencies:
npm install

Configure environment variables:
Copy .env.example to .env and update database credentials.

# Run database migrations:
npx knex migrate:latest 

# Run Seeder:
npx knex seed:run

This will create a user in DB,use credentials given below to login.

User Email: uzairkhurshid12@gmail.com

User Password: uzair@123

# Start Server
npm run dev

# Running with DockerBuild and start the containers:
docker-compose up --buildThe API will be available at http://localhost:3000

# Postman Collection
This project's Postman collection is attached in the root directory (project_1.postman_collection.json)