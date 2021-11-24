const { response } = require('express');
const { Product } = require('../models');

const getProducts = async (req, res = response) => {
    const { limit = 5, since = 0 } = req.query;
    const query = { status: true };

    const [total, products] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
            .populate('user', 'name')
            .skip(Number(since))
            .limit(Number(limit))
    ]);

    res.json({
        total,
        products
    });
}

const getProduct = async (req, res = response) => {
    const { id } = req.params;
    const product = await Product.findById(id)
        .populate('user', 'name')
        .populate('category', 'name');

    res.json(product);
}

const createProduct = async (req, res = response) => {
    const { status, user, ...body } = req.body;

    const productDB = await Product.findOne({ name: body.name.toUpperCase() });

    if (productDB) {
        return res.status(400).json({
            msg: `Product ${productDB.name} already exists`
        });
    }

    const data = {
        ...body,
        name: body.name.toUpperCase(),
        user: req.user._id
    }

    const product = new Product(data);

    await product.save();

    res.status(201).json(product);
}

const updateProduct = async (req, res = response) => {

    const { id } = req.params;
    const { status, user, ...data } = req.body;

    if (data.name) {
        data.name = data.name.toUpperCase();
    }

    data.user = req.user._id;

    const product = await Product.findByIdAndUpdate(id, data, { new: true });

    res.json(product);
}

const deleteProduct = async (req, res = response) => {
    const { id } = req.params;

    const productDeleted = await Product.findByIdAndUpdate(id, { status: false }, { new: true });

    res.json(productDeleted);
}

module.exports = {
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct
}