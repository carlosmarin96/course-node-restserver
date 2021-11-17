const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                msg: "User or password is not correct - email"
            });
        }

        if (!user.status) {
            return res.status(400).json({
                msg: "User or password is not correct - status: false"
            });
        }

        const validPassword = bcryptjs.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                msg: "User or password is not correct - password"
            });
        }

        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        });

    } catch (error) {
        res.status(500).json({
            msg: 'You must contact with administrator'
        });
    }
}

const googleSignIn = async (req, res = response) => {
    const { id_token } = req.body;

    try {

        const { name, img, email } = await googleVerify(id_token);

        let user = await User.findOne({ email });

        if (!user) {
            const data = {
                name,
                email,
                password: ':p',
                img,
                google: true
            };

            user = new User(data);
            await user.save();
        }

        if (!user.status) {
            return res.status(401).json({
                msg: 'Get connection to admin, user blocked'
            });
        }

        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        });
    } catch (error) {
        res.status(400).json({
            msg: 'Token cannot be identified'
        })
    }


}

module.exports = {
    login,
    googleSignIn
}