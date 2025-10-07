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

✅ 100% test coverage

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

## 💅API Endpoints
Authentication
Method	Endpoint	Description
```bash
POST	/api/auth/signup	    Register new user

POST	/api/auth/login	    User login

POST	/api/auth/logout	    User logout

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
