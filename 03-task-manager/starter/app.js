const express = require('express');
const taskRoutes = require('./routes/task-routes');
const path = require('path');

const app = express();
const port = 3000;

// middleware
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.json());

// routes
app.use('/api/v1/tasks', taskRoutes);

app.listen(port, () => {
    console.log("Server is started on port 3000");
});