const Product = require('../models/product.js');

const getAllProductsStatic = async (req, res) => {
    // Throwing the Error will be automatically handled by express-async-errors package (no need to call next)
    // The error will be available in error-handler.js middleware
    // throw new Error("from static producs"); 

    const products = await Product.find({});
    res.status(200).send({ products });
};

const getAllProducts = async (req, res) => {
    const products = await Product.find({});
    res.status(200).send({ products });
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