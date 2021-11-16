
const { Router } = require('express');
const { check } = require('express-validator');

// const { validateField } = require('../middlewares/validate-fields');
// const { vaidateJWT } = require('../middlewares/validate-jwt');
// const { isAdminRole, validRoles } = require('../middlewares/validate-roles');

const { validateField, vaidateJWT, isAdminRole, validRoles } = require('../middlewares');

const { validRole, validEmail, validUserById } = require('../helpers/db-validators');

const { usersGet, usersPost, usersPut, usersPatch, usersDelete } = require('../controllers/users');

const router = Router();

router.get('/', usersGet);

router.put('/:id', [
    check('id', 'ID is not valid').isMongoId(),
    check('id').custom(validUserById),
    check('role').custom(validRole),
    validateField
], usersPut);

router.post('/', [
    check('name', 'The name is not valid').not().isEmpty(),
    check('password', 'The password must be 6 letters or more').isLength({ min: 6 }),
    check('email', 'The email is not valid').isEmail(),
    check('email').custom(validEmail),
    // check('role', 'The role is not valid').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(validRole),
    validateField
], usersPost);

router.delete('/:id', [
    vaidateJWT,
    validRoles('ADMIN_ROLE', 'SELLS_ROLE'),
    check('id', 'ID is not valid').isMongoId(),
    check('id').custom(validUserById),
    validateField
], usersDelete);

router.patch('/', usersPatch);

module.exports = router;