const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const usersGet = async (req = request, res = response) => {

    const { limit = 5, since = 0 } = req.query;
    const activeUsers = { status: true };

    const [total, users] = await Promise.all([
        User.countDocuments(activeUsers),
        User.find(activeUsers)
            .skip(Number(since))
            .limit(Number(limit))
    ])

    res.json({
        total,
        users
    });
}

const usersPost = async (req, res = response) => {

    const { name, email, password, role } = req.body;

    const user = new User({ name, email, password, role });


    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);


    await user.save();

    res.json({
        user
    });
}

const usersPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, email, ...resto } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, resto);

    res.json(user);
}

const usersPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - controller'
    });
}

const usersDelete = async (req, res = response) => {

    const { id } = req.params;

    // const user = await User.findByIdAndDelete(id);

    const user = await User.findByIdAndUpdate(id, { status: false });

    res.json(user);
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
}