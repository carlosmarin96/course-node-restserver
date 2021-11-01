const Role = require('../models/role');
const User = require('../models/user');

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
module.exports = {
    validRole,
    validEmail,
    validUserById
}