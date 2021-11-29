const Role = require('../models/role');
const { User, Category, Product } = require('../models');

const validRole = async (role = '') => {
    const roleExist = await Role.findOne({ role });
    if (!roleExist) {
        throw new Error(`Role ${role} does not exist in DB`);
    }
}

const validEmail = async (email = '') => {
    const emailExist = await User.findOne({ email });
    if (emailExist) {
        throw new Error(`Email: ${email} was already taken`);
    }
}

const validUserById = async (id) => {
    const userExist = await User.findById(id);
    if (!userExist) {
        throw new Error(`User: ${id} does not exist`);
    }
}

// categories

const verifyCategoryById = async (id) => {
    const categoryExist = await Category.findById(id);
    if (!categoryExist) {
        throw new Error(`Category: ${id} does not exist`);
    }
}

// products
const verifyProductById = async (id) => {
    const productExist = await Product.findById(id);
    if (!productExist) {
        throw new Error(`Product: ${id} does not exist`);
    }
}

//collections

const collectionsAllowed = (collection = '', collections = []) => {
    const included = collections.includes(collection);
    if (!included) {
        throw new Error(`${collection} is not allowed, ${collections}`);
    }

    return true;
}




module.exports = {
    validRole,
    validEmail,
    validUserById,
    verifyCategoryById,
    verifyProductById,
    collectionsAllowed
}