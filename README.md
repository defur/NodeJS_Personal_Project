# 🎓 University Admission Calculator

A web application that helps calculate admission chances for German universities.  
Project developed as part of **Node.js-2025-01** coursework.


## 🚀 Quick Start

```bash
git clone https://github.com/defur/NodeJS_Personal_Project.git

cd NodeJS_Personal_Project

docker compose up --build
```
Then open: http://localhost:3001

## 🎓 Usage

1. Register a new user.  
2. Select your subjects and assign grades (from **1** to **100**).  
3. Click **"Check"** to see your results.  

The system will show whether you:  
- ✅ Got into a **budget-funded program**  
- 🎓 Qualified for a **scholarship**  
- ❌ Or did **not pass** the admission


## 🌸 Features

✅ Admission score calculator

✅ Database of universities

✅ JWT-based authentication

✅ Responsive design

✅ 52% test coverage

## 🤓 Tech Stack
### Backend:

- Node.js + Express.js

- JWT Authentication

- bcrypt for password hashing

### Database:

- MySQL 8.0

- Docker containerization

### Testing & Quality:

- Jest for unit testing

- ESLint + Prettier

- GitHub Actions CI/CD

## API Endpoints check options 

### 1. Via browser (quick method)
Open in your browser:
```bash
http://localhost:3001/api/test - check API

http://localhost:3001/signup - registration page

http://localhost:3001/login - login page
```
### 2. Via Thunder Client (for VScode):
- Registration
```http
POST http://localhost:3001/api/auth/signup

Body(json):
{
  "email": "student@example.com",
  "password": "123456",
  "full_name": "Test User"
}
```
you should receive the following response:
```http
{
  "message": "User registered successfully"
}
```


- User login (use only after registration!):
```http
POST http://localhost:3001/api/auth/login

Body(json):
{
  "email": "student@example.com",
  "password": "123456"
}
```
you should receive the following response:
```http
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
- You can also get user data:
```http
GET http://localhost:3001/api/auth/me

Authorization     Bearer INSERT_THE_TOKEN_YOU_RECEIVED_DURING_LOGIN_HERER

```


you should receive the following response:
```http
{
  "id": 45,
  "email": "student@example.com",
  "full_name": "Test User",
  "role": "student"
}
```
Authentication
Method	Endpoint	Description
```bash
POST	http://localhost:3001/api/auth/signup	    Register new user

POST	http://localhost:3001/api/auth/login	    User login

POST	http://localhost:3001/api/auth/logout	    User logout

```
## 🧪 Testing
```bash
# Run tests
npm test

```

## 🔧 Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run linter
npm run lint
```
## 🤙 Database Schema

![Database Schema](./діаграма.png)
