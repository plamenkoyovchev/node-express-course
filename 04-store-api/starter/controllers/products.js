const getAllProductsStatic = async (req, res) => {
    // Throwing the Error will be automatically handled by express-async-errors package (no need to call next)
    // The error will be available in error-handler.js middleware
    // throw new Error("from static producs"); 
    res.status(200).send({ msg: 'products testing route' });
};

const getAllProducts = async (req, res) => {
    res.status(200).send({ msg: 'products route' });
};

const getProduct = async (req, res) => {

};

const createProduct = async (req, res) => {

};

const updateProduct = async (req, res) => {

};

module.exports = {
    getAllProducts,
    getAllProductsStatic
};