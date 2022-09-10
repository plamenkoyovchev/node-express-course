const express = require('express');
const taskRoutes = require('./routes/task-routes');

const app = express();
const port = 3000;

// middleware
app.use(express.static('public'));
app.use(express.json());

// routes
app.use('/api/v1/tasks', taskRoutes);

app.listen(port, () => {
    console.log("Server is started on port 3000");
});