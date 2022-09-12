const Product = require('../models/product.js');

const getAllProducts = async (req, res) => {
    const { featured, company, name, fields, numericFilters } = req.query;

    // query
    const query = {};
    if (featured) {
        query.featured = featured;
    }

    if (company) {
        query.company = company;
    }

    if (name) {
        query.name = { $regex: name, $options: "i" };
    }

    // numeric filters
    if (numericFilters) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte'
        };

        const pattern = /\b(<|>|>=|=|<|<=)\b/g;
        let filters = numericFilters.replace(pattern, (match) => `-${operatorMap[match]}-`);

        const numericFields = ['price', 'rating'];
        filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-');
            if (numericFields.includes(field)) {
                query[field] = {
                    [operator]: +value
                };
            }
        });
    }

    // sort
    let result = Product.find(query);
    if (sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    } else {
        result = result.sort("-createdAt");
    }

    // select fields
    if (fields) {
        const fieldsList = fields.split(',').join(' ');
        result = result.select(fieldsList);
    }

    // paging
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 10;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);

    const products = await result;

    res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
    getAllProducts
};