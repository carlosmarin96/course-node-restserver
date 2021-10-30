const { response } = require('express');

const usersGet = (req = request, res = response) => {

    const { q, name = '', apikey, page = 1, limit } = req.query;

    res.json({
        msg: 'get API - controller',
        q,
        name,
        apikey,
        page,
        limit
    });
}

const usersPost = (req, res = response) => {

    const { name, age } = req.body;

    res.json({
        msg: 'post API - controller',
        name,
        age
    });
}

const usersPut = (req, res = response) => {

    const id = req.params.id;

    res.json({
        msg: 'put API - controller',
        id
    });
}

const usersPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - controller'
    });
}

const usersDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - controller'
    });
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
}