const express = require('express');
const taskRoutes = require('./routes/task-routes');
const path = require('path');
const connectToDb = require('./db/connect');

// configures env variables in .env files
require('dotenv').config();

const app = express();
const port = 3000;

// middleware
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.json());

// routes
app.use('/api/v1/tasks', taskRoutes);

const start = async () => {
    try {
        await connectToDb(process.env.MONGO_CONNECTION_STRING);
        app.listen(port, () => {
            console.log("Server is started on port 3000");
        });
    } catch (error) {
        console.error(error);
    }
};

start();