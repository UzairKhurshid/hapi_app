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
```
git clone https://github.com/UzairKhurshid/hapi_app.git
```

```
cd hapi_app
```

Install dependencies:
```
npm install
```

Configure environment variables:
Copy .env.example to .env and update database credentials.

Create You Postgres DB:

# Run database migrations:
```
npx knex migrate:latest --env development
```

# Run Seeder:
```
npx knex seed:run
```

This will create a user in DB,use credentials given below to login.

User Email: uzairkhurshid12@gmail.com

User Password: uzair@123

# Start Server
```
npm run dev
```

# Docker Configuration:
```
docker-compose up --build  // build containers
docker ps // List containers
docker exec -it hapi_app sh
npx knex migrate:latest --env development
npx knex seed:run
```

The API will be available at http://localhost:3000

# API Documentation
The API documentation is available in the hapi_documentation.txt file located in the root directory.

# Postman Collection
This project's Postman collection is attached in the root directory (hapi_app_postman.json)