# PassMan-Password Manager
A functional and completely responsive web-app that enables user to manage their passwords(alongwith their usernames and URL) by saving them into database which is visible in the table in UI. 

### Frontend
The frontend is built with ReactJs consisting following major components:
- `Navbar` : Contains user button to see username which is currently logged in and a log out button
- `Manager` : Contains all the core functionality in `Manager.jsx`
- `Sign up` (in progress) : User can create a new account
- `Sign in` (in progress) : : User can login with an existing account

### Backend
**Backend** is developed using **Express.js** and **MongoDB**.  
Passwords submitted by users are stored in a MongoDB collection.  
The `server.js` file acts as the central server logic, handling API requests and managing all database operations such as adding, updating, and retrieving passwords.

## Installation and Setup
### Prerequisites
Make sure you have the following installed:
- Node.js
- npm
- MongoDB
 ### Clone the Repository
 
 ```bash
git clone https://github.com/codecv28/Password-Manager.git
cd Password-Manager
```
`Note` : Open whole program and backend folder in separate windows
### Setup `backend` (Express.js + MongoDB)
```bash
cd backend
npm install
```
#### Create a `.env` file inside the `backend` folder with the following content
```bash
MONGODB_URI=your_mongodb_connection_string
```
### Start the backend server
```bash
npm start
```
### Setup frontend (React)
```bash
npm install
npm run dev
```
Finally, open the project on (link is visible on your terminal after the running `npm run dev` command) :
```bash
http://localhost:5173/
```
![image](https://github.com/user-attachments/assets/35c41cf7-0248-4a7a-b872-63b0fb7193fe)
![image](https://github.com/user-attachments/assets/0c8cd02f-af49-46f6-8de3-c4288085d205)
![image](https://github.com/user-attachments/assets/bcd9f1fe-d386-4a71-861e-6f2102eb669c)

## Future Updates/Improvements 
- Add user authentication (`login`/`signup`) to enable account-based password storage
- Enable dark/light mode toggle for personalized theme preference
- Hash passwords using `bcrypt` before storing them in the database for enhanced security
