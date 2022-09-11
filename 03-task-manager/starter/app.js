const express = require('express');
const taskRoutes = require('./routes/task-routes');
const path = require('path');
const connectToDb = require('./db/connect');

// configures env variables in .env files
require('dotenv').config();
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.json());


// routes
app.use('/api/v1/tasks', taskRoutes);

app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
    try {
        await connectToDb(process.env.MONGO_CONNECTION_STRING);
        app.listen(port, () => {
            console.log(`Server is started on port ${port}`);
        });
    } catch (error) {
        console.error(error);
    }
};

start();