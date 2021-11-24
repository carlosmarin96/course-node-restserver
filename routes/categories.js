const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT, validateField, isAdminRole } = require('../middlewares');

const { createCategory, getCategories, getCategory, updateCategory, deleteCategory } = require('../controllers/categories');

const { verifyCategoryById } = require('../helpers/db-validators');

const router = Router();

router.get('/', getCategories);

router.get('/:id', [
    check('id', 'It is not Mongo id valid').isMongoId(),
    check('id').custom(verifyCategoryById),
    validateField
], getCategory);

router.post('/', [
    validateJWT,
    check('name', 'The name is needed').not().isEmpty(),
    validateField
], createCategory);

router.put('/:id', [
    validateJWT,
    check('name', 'The name is needed').not().isEmpty(),
    check('id').custom(verifyCategoryById),
    validateField
], updateCategory);

router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'It is not Mongo id valid').isMongoId(),
    check('id').custom(verifyCategoryById),
    validateField
], deleteCategory);

module.exports = router;