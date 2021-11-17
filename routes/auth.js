const { Router } = require('express');
const { check } = require('express-validator');

const { validateField } = require('../middlewares/validate-fields');

const { login, googleSignIn } = require('../controllers/auth');

const router = Router();

router.post('/login', [
    check('email', 'Email is needed').isEmail(),
    check('password', 'Password is needed').not().isEmpty(),
    validateField
], login);

router.post('/google', [
    check('id_token', 'id_token is needed').not().isEmpty(),
    validateField
], googleSignIn);

module.exports = router;