
# MoneyMap
### Finance Manager visualized to see expenses.
---
## About this Project

The purpose of this project was to allow users to see their expenses visualised.

---
## Key Features

- **Dashboard Overview**: Visual summary of income, expenses, and balance at a glance.  
- **Expense & Income Tracking**: Add, edit, and manage all transactions easily.  
- **Visual Reports**: Charts and graphs to analyze spending patterns over time.  
- **Budget Management**: Set budgets and track actual vs. planned expenses.
- **Responsive Design: This project accommodates all types of users.

---
## Live Demo

Below is a live demo of the projects

![20250912-1017-49 0950898](https://github.com/user-attachments/assets/ed1d406d-4213-4782-a053-b433836eee0d)
![20250912-1018-39 0604322](https://github.com/user-attachments/assets/1717d663-c69e-4e1a-9ce9-7e6c52249038)

---

## Technologies
- **Frontend**: HTML, CSS, JavaScript  
- **Backend**: Node.js with Express  
- **Database**: PostgreSQL 

---

## Setup & Installation

Following the steps below will allow you to run the project locally.

### Prerequisites
- Node.js & npm
- PostgreSQL
- IDE
### Database
1. Open up Pgadmin, once opened
```
alt + shift + q
```
2. Create the database
```
CREATE DATABASE finance_manager;
```
3. Create the tables
```
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    amount NUMERIC(10,2) NOT NULL,
    type VARCHAR(50) NOT NULL,
    description TEXT,
    date TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);
```
---
### Backend

Open Visual studio first

1. Clone the repo in visual studio code
```
git clone https://github.com/mohammedhassan37/MoneyMapV2.git
```
2. Open the project 
```
cd MoneyMapV2
```
3. Go to Backend folder
```
cd backend
```
4. Create ENV file
```
touch .env
```
5. Add ENV file variables
```
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD='YourPostgresPassword'
DB_NAME=finance_manager
DB_PORT=5432
JWT_SECRET=supersecretkey123
```
6. Start the server
```
cd backend
node server.js
```
---
### Front end
1. Install dependencies
```
npm install
```
2. Start the server
```
node server.js
```
3. Open the server
```
http://localhost:5000/
```
---
### Contact
If any one of you has any questions, please contact me!
- **Linkedin**: https://www.linkedin.com/in/mohammed-hassan-b92826290/
- **Email**: mohammedhassan37@outlook.com










=======
# MoneyMap
### Finance Manager visualized to see expenses.
---
## About this Project

The purpose of this project was to allow users to see their expenses visualised.

---
## Key Features

- **Dashboard Overview**: Visual summary of income, expenses, and balance at a glance.  
- **Expense & Income Tracking**: Add, edit, and manage all transactions easily.  
- **Visual Reports**: Charts and graphs to analyze spending patterns over time.  
- **Budget Management**: Set budgets and track actual vs. planned expenses.
- **Responsive Design: This project accommodates all types of users.

---
## Live Demo

Below is a live demo of the projects

![20250912-1017-49 0950898](https://github.com/user-attachments/assets/ed1d406d-4213-4782-a053-b433836eee0d)
![20250912-1018-39 0604322](https://github.com/user-attachments/assets/1717d663-c69e-4e1a-9ce9-7e6c52249038)

---

## Technologies
- **Frontend**: HTML, CSS, JavaScript  
- **Backend**: Node.js with Express  
- **Database**: PostgreSQL 

---

## Setup & Installation

Following the steps below will allow you to run the project locally.

### Prerequisites
- Node.js & npm
- PostgreSQL
- IDE
### Database
1. Open up Pgadmin, once opened
```
alt + shift + q
```
2. Create the database
```
CREATE DATABASE finance_manager;
```
3. Create the tables
```
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    amount NUMERIC(10,2) NOT NULL,
    type VARCHAR(50) NOT NULL,
    description TEXT,
    date TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);
```
---
### Backend

Open Visual studio first

1. Clone the repo in visual studio code
```
git clone https://github.com/mohammedhassan37/MoneyMapV2.git
```
2. Open the project 
```
cd MoneyMapV2
```
3. Go to Backend folder
```
cd backend
```
4. Create ENV file
```
touch .env
```
5. Add ENV file variables
```
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD='YourPostgresPassword'
DB_NAME=finance_manager
DB_PORT=5432
JWT_SECRET=supersecretkey123
```
6. Start the server
```
cd backend
node server.js
```
---
### Front end
1. Install dependencies
```
npm install
```
2. Start the server
```
node server.js
```
3. Open the server
```
http://localhost:5000/
```
---
### Contact
If any one of you has any questions, please contact me!
- **Linkedin**: https://www.linkedin.com/in/mohammed-hassan-b92826290/
- **Email**: mohammedhassan37@outlook.com

