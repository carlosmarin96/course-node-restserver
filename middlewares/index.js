const validateField = require('../middlewares/validate-fields');
const vaidateJWT = require('../middlewares/validate-jwt');
const validateRoles = require('../middlewares/validate-roles');

module.exports = {
    ...validateField,
    ...vaidateJWT,
    ...validateRoles
}