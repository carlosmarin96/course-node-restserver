const { response } = require('express')

const isAdminRole = (req, res = response, next) => {

    if (!req.user) {
        return res.status(500).json({
            msg: 'Verify token before verify role'
        });
    }

    const { role, name } = req.user;

    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${name} is not admin - You can do it`
        });
    }
    next();
}

const validRoles = (...roles) => {
    return (req, res = response, next) => {

        if (!req.user) {
            return res.status(500).json({
                msg: 'Verify token before verify role'
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(401).json({
                msg: `You need to be from one of this ${roles}`
            });
        }

        next();
    }
}

module.exports = {
    isAdminRole,
    validRoles
}