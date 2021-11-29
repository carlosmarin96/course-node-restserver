const { Router } = require('express');
const { check } = require('express-validator');

const { validateField, validateFile } = require('../middlewares');
const { uploadFile, updateImage, showImage, updateImageCloudinary } = require('../controllers/uploads');
const { collectionsAllowed } = require('../helpers');

const router = Router();

router.post('/', validateFile, uploadFile);

router.put('/:collection/:id', [
    validateFile,
    check('id', 'Id must be mongoId').isMongoId(),
    check('collection').custom(c => collectionsAllowed(c, ['users', 'products'])),
    validateField
], updateImageCloudinary);

router.get('/:collection/:id', [
    check('id', 'Id must be mongoId').isMongoId(),
    check('collection').custom(c => collectionsAllowed(c, ['users', 'products'])),
    validateField
], showImage);

module.exports = router;