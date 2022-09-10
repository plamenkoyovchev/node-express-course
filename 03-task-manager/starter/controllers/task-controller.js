const Task = require('../models/Task');

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ msg: 'Error loading tasks' });
    }
};

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json({ task });
    } catch (error) {
        // TODO: extract validation messages only
        res.status(500).json({ msg: error });
    }
};

const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).exec();
        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }

        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

const updateTask = (req, res) => {
    res.send('Update task');
};

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const taskToDelete = await Task.exists({ _id: id });
        if (!taskToDelete) {
            return res.status(404).json({ msg: "Task not found." });
        }

        await Task.deleteOne({ _id: id });
        res.status(200).send(true);
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
};