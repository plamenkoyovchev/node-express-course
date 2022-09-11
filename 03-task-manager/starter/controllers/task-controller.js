const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');

const getAllTasks = asyncWrapper(
    async (req, res) => {
        const tasks = await Task.find({});
        res.status(200).json({ tasks });
    }
);

const createTask = asyncWrapper(
    async (req, res) => {
        const task = await Task.create(req.body);
        res.status(201).json({ task });
    }
);

const getTask = asyncWrapper(
    async (req, res) => {
        const task = await Task.findById(req.params.id).exec();
        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }

        res.status(200).json({ task });
    }
);

const updateTask = asyncWrapper(
    async (req, res) => {
        const taskToUpdate = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!taskToUpdate) {
            return res.status(404).json({ msg: 'Task not found' });
        }

        res.status(200).send({ task: taskToUpdate });
    }
);

const deleteTask = asyncWrapper(
    async (req, res) => {
        const taskToDelete = await Task.findOneAndDelete({ _id: req.params.id });
        if (!taskToDelete) {
            return res.status(404).json({ msg: "Task not found." });
        }

        res.status(200).send(true);
    }
);

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
};