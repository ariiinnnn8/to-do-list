const express = require('express');
const winston = require('winston');
const app = express();
const mongoose = require('mongoose');

const Task = require('./models/Task'); 
const PORT = process.env.PORT || 3000;

const dbURI = 'mongodb://localhost:27017/mydatabase';

// Create a logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'combined.log' })
  ],
});

// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('Connected to MongoDB');
    // Start the server after the database connection is established
    app.listen(PORT, () => {
      logger.info(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    logger.info('Error connecting to MongoDB:', err);
  });

// Middleware
app.use(express.json());

let taskList = []; // Initialize an empty array to store users

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to TO DO LIST');
  logger.info('GET / - home route');
});

app.post("/api/task", async (req, res) => { 
    logger.info('POST /tasks - Request body:', req.body); 
    try { const currentTask = new Task(req.body); 
        const savedTask = await currentTask.save(); 
        res.status(201).json({ message: `Task with the name ${savedTask.name} added to the database.`, savedTask, }); 
    } catch (err) { 
        logger.error('Error saving task to the database:', err); 
        res.status(500).json({ message: 'Error saving task to the database', error: err.message, }); 
    } 
});

// Get a specific task
app.get("/api/tasks/:blogId", (req, res) => { 
  const { blogId } = req.params; 
  logger.info(`GET /users/:blogId - blogId: ${blogId}`);
  const task = taskList.find((task) => task.blogId === parseInt(blogId));
  if (task) { 
    res.json({ 
      message: "Task available", 
      task 
    });
  } else { 
    return res.status(404).json({ 
      message: `Couldn't find task with 'blogId'=${blogId}`,
    }); 
  }
});

// Get all tasks
app.get("/api/tasks", (req, res) => {
  if (!taskList.length) {
    return res.status(404).json({
      message: "No task data available",
      taskList,
    });
  }
  res.json({
    message: "Successfully fetched taskList",
    taskList,
  });
  logger.info('GET /taskList - tasks fetched');
});

// Update a task
app.put("/api/tasks/:blogId", (req, res) => {
  const { blogId } = req.params;
  const { assignTo, status } = req.body;
  logger.info(`PUT /api/tasks/:blogId - blogId: ${blogId}, body: ${JSON.stringify(req.body)}`);
  const task = taskList.find((task) => task.blogId === parseInt(blogId));
  if (task) {
    task.assignTo = assignTo;
    task.status = status;
    res.status(200).json({
      message: `Task with the blogId ${blogId} has been updated`,
      task,
    });
  } else {
    res.status(404).json({ 
      message: `Couldn't find task with 'blogId'=${blogId}` 
    });
  }
});

// Delete a task
app.delete("/api/tasks/:blogId", (req, res) => {
  const { blogId } = req.params;
  logger.info(`DELETE /api/tasks/:blogId - blogId: ${blogId}`);
  taskList = taskList.filter((task) => task.blogId !== parseInt(blogId));
  res.status(200).json({
    message: `Task with the blogId ${blogId} deleted from the database.`,
  });
});
