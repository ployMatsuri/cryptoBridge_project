## Fullname
**Vimonsiri Thammada**

# Cryptocurrency Exchange System

This project is a cryptocurrency exchange system built with Node.js, Sequelize, and PostgreSQL.

# Prerequisites

- Node.js
- PostgreSQL
- Sequelize ORM
- `requirements.txt` for dependencie

# Setup and Installation

## 1. Clone the Repository
```git clone https://github.com/ployMatsuri/cryptoBridge_project.git
cd CryptoExchange
```

## 2. Install dependencies
```npm install
```

## 3. Create a .env file in the root directory
Set up the database configuration in the .env file:
```
DB_HOST=localhost
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=crypto_exchange
DB_NAME_TEST=crypto_exchange_test
DB_NAME_PROD=crypto_exchange_prod
```

## 4. Create the PostgreSQL database
- Use **pgAdmin 4** to create a new PostgreSQL database as specified in the `.env` file.
- Ensure that the database, username, and password match those defined in the `config/config.js`.
  
## 5. Run the Application
```node app.js```

## 6. Seed the Database
```node seeders/01_seed_demo.js```

## 7. Test the Seeded Data
```node testSeed.js```

## 8. Test the API
Use tools like Postman or cURL to test the API endpoints. For example, test the users API by sending a GET request to:
```http://localhost:3000/users```

# Project Structure
- **models/** - Sequelize models
- **controllers/** - Logic for API routes
- **routes/** - API route definitions
- **seeders/** - Demo data seeders
- **testSeed.js** - Seed data verification script
  
