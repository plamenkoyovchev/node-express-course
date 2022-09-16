const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError, UnauthenticatedError } = require('../errors');

const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        throw new BadRequestError('Please provide name, email and password.');
    }

    const user = await User.create({ ...req.body });
    const token = user.generateJWT();

    res.status(StatusCodes.CREATED)
        .json({
            user: {
                name: user.name
            },
            token
        });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequestError('Please provide email and password.');
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new UnauthenticatedError("");
    }

    const passwordIsValid = await user.comparePassword(password);
    if (!passwordIsValid) {
        throw new UnauthenticatedError("");
    }

    const token = user.generateJWT();
    res.status(StatusCodes.OK)
        .json({
            user: {
                name: user.name
            },
            token
        });
};

module.exports = {
    register,
    login
};