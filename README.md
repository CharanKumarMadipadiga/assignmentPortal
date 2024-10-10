# Assignment Submission Portal
This project is a backend system for an Assignment Submission Portal, where users can upload assignments and admins can accept or reject them.


## Objective
Develop a backend system that supports two types of users: Users and Admins. Users can submit assignments, and admins can manage the submissions by accepting or rejecting them.


## Features
### Users:
Register and login.
Upload assignments.
Fetch a list of available admins.


### Admins:
Register and login.
View all assignments tagged to them.
Accept or reject assignments.
View assignment details, including username, task, and timestamp.


## API Endpoints
### User Endpoints
POST /user/register
Register a new user.

POST /user/login
User login and receive an authentication token.

POST /user/upload
Upload an assignment. The user must be authenticated via a token.

GET /user/admins
Fetch a list of all admins.


### Admin Endpoints
POST /admin/register
Register a new admin.

POST /admin/login
Admin login and receive an authentication token.

GET /admin/assignments
View all assignments tagged to the logged-in admin.

POST /admin/assignments/:id/accept
Accept a specific assignment by its ID.

POST /admin/assignments/:id/reject
Reject a specific assignment by its ID.


## Technology Stack
Backend: Node.js, Express.js
Database: MongoDB
Authentication: JWT
ORM: Mongoose
Validation: Express-validator
Logging: Morgan
Version Control: Git


## Prerequisites
Node.js: Version 14.x or later
MongoDB: Ensure MongoDB is installed and running or use a cloud MongoDB service like MongoDB Atlas.
NPM: Package manager for installing dependencies.


## Installation
1. Clone the repository:
   git clone https://github.com/your-username/assignment-submission-portal.git
   cd assignment-submission-portal

2. Install the required dependencies:
   npm install

3. Create a .env file in the root directory with the following environment variables:
   MONGO_URI=<Your MongoDB URI>
   JWT_SECRET=<Your JWT Secret Key>
   PORT=4000

4. Start the server:
   npm start
   The server will be running on http://localhost:4000.


## API Usage
### User Registration Example
Endpoint: POST /user/register
payload: {
  "firstName": "John",
  "lastName": "Doe",
  "username": "johndoe",
  "password": "your_password",
  "role": "user or admin"
}

### User Login Example
Endpoint: POST /user/login
payload: {
  "username": "johndoe",
  "password": "your_password"
}

### User upload assignment api Example
Endpoint: POST /user/upload           // uploads assignment   (token is required)   place the token in headers
payload: {
  
  "task": "your task",
  "admin": "admin username"
}

### Fetching all admins
Endpoint: GET /user/admins           // retrieves all admins  (token is required)   place the token in headers


### Admin Registration and Login
Same as user registration and login


### Fetching all assignments of admin
Endpoint: GET /admin/assignments     // retrieves all assignments of logged in admin (token is required)   place the token in headers

### Admin Accept or Reject Assignment Example
Endpoint: POST /admin/assignments/:id/accept     // will accept the assignment     here id is assignment id
Endpoint: POST /admin/assignments/:id/reject     // will reject the assignment     here id is assignment id



## Logging and Debugging
The system uses Morgan for request logging. All incoming requests and responses are logged to the console for easy debugging.


## License
This project is licensed under the MIT License.
