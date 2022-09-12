require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const connectToDb = require('./db/connect');

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// middleware
app.use(express.json());

app.get('/', (req, res) => {

});

const productsRouter = require('./routes/products');
app.use('/api/v1/products', productsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
const start = async () => {
    try {
        await connectToDb(process.env.MONGO_CONNECTION_STRING);
        app.listen(port, () => console.log(`Server is listening on port: ${port}`));
    } catch (error) {
        console.error(error);
    }
};

start();