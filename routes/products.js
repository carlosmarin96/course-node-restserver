const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT, validateField, isAdminRole } = require('../middlewares');

const { createProduct, getProducts, getProduct, updateProduct, deleteProduct } = require('../controllers/products');

const { verifyCategoryById, verifyProductById } = require('../helpers/db-validators');

const router = Router();

router.get('/', getProducts);

router.get('/:id', [
    check('id', 'It is not Mongo id valid').isMongoId(),
    check('id').custom(verifyProductById),
    validateField
], getProduct);

router.post('/', [
    validateJWT,
    check('name', 'The name is needed').not().isEmpty(),
    check('category', 'Mongo Id is not valid').isMongoId(),
    check('category').custom(verifyCategoryById),
    validateField
], createProduct);

router.put('/:id', [
    validateJWT,
    check('id', 'It is not Mongo id valid').isMongoId(),
    check('id').custom(verifyProductById),
    check('category', 'Mongo Id is not valid').optional().isMongoId(),
    check('category').optional().custom(verifyCategoryById),
    validateField
], updateProduct);

router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'It is not Mongo id valid').isMongoId(),
    check('id').custom(verifyProductById),
    validateField
], deleteProduct);



module.exports = router;