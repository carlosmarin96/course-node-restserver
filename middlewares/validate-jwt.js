const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const vaidateJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'There is no token in your request'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRECTORPRIVATEKEY);

        const user = await User.findById(uid);

        if (!user) {
            return res.status(401).json({
                msg: 'Token no valid - user doesnt exist'
            });
        }

        if (!user.status) {
            return res.status(401).json({
                msg: 'Token no valid - user with false status'
            });
        }

        req.user = user;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token is not valid'
        });
    }

}

module.exports = {
    vaidateJWT
}