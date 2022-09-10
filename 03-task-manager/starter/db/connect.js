const mongoose = require('mongoose');

const connectToDb = (connectionString) => {
    return mongoose
        .connect(connectionString, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });
};

module.exports = connectToDb;