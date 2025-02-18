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
Docker (optional, for containerized setup)

# Setup
Clone the repository:
git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git

cd YOUR_REPO_NAME

Install dependencies:
npm install

Configure environment variables:
Copy .env.example to .env and update database credentials.

# Run database migrations:
npx knex migrate:latest 

# Run Seeder:
npx knex seed:run

# Start Server
npm start

# Running with DockerBuild and start the containers:
docker-compose up --buildThe API will be available at http://localhost:3000