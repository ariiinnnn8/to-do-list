This project is a simple ToDoList API built with  Node.js ,  Express.js , and  MongoDB . The API allows users to perform CRUD operations on a To-Do list, including adding, retrieving, updating, and deleting tasks.
[API Documentation - To-Do List] Postman : https://documenter.getpostman.com/view/22526576/2sAYQcGAyW

Features


Create : Add new tasks to the ToDo list.

Read : Fetch all tasks.

Update : Edit the details of an existing task by ID.

Delete : Remove a task from the ToDo list by ID.


Installation
To run the ToDoList API locally, follow the steps below:

1. Clone the Repository
First, clone the repository to your local machine:
git clone https://gitlab.com/username/ng-training-todolist.git 

2. Install Dependencies
Navigate into the project folder and install the required dependencies using  npm :
cd ng-training-todolist npm install 

3. Set Up MongoDB
Make sure you have MongoDB installed and running on your local machine or set up a MongoDB Atlas cloud database. Then, create a .env file in the root of your project and add your MongoDB URI like this:
MONGO_URI=mongodb://127.0.0.1:27017/todolist

4. Run the Application
Once the dependencies are installed and the database is set up, you can start the server with the following command:
npm start
The API will be accessible at http://localhost:2000.

API Endpoints

1. GET /api/get

Fetch all tasks in the ToDo list.
Response:


200 OK: List of tasks.

200 OK: Message when there are no tasks in the list.


2. POST /api/add

Add a new task to the ToDo list.
Request Body:
{   "task": "Task description",   "completed": false }
Response:


201 Created: Message and the added task.

400 Bad Request: If task is missing or not a string.


3. PUT /api/update/:id

Update a task by ID.
Request Body:
{   "task": "Updated task description",   "completed": true }
Response:


200 OK: Message and the updated task.

404 Not Found: If the task with the given ID does not exist.


4. DELETE /api/delete/:id

Delete a task by ID.
Response:


200 OK: Message indicating the task was deleted.

404 Not Found: If the task with the given ID does not exist.


Technologies Used

Node.js
Express.js
MongoDB
Mongoose


License
This project is licensed under the MIT License - see the LICENSE file for details.
