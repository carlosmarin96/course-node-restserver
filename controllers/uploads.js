const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { response } = require('express');
const { loadFile } = require('../helpers');

const { User, Product } = require('../models');

const uploadFile = async (req, res = response) => {

    try {
        // const fileName = await loadFile(req.files, ['txt', 'md'], 'texts');
        const fileName = await loadFile(req.files, undefined, 'imgs');
        res.json({ fileName });
    } catch (msg) {
        res.status(400).json({ msg });
    }


}

const updateImage = async (req, res = response) => {

    const { id, collection } = req.params;

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);

            if (!model) {
                return res.status(400).json({
                    msg: `No user with id ${id}`
                });
            }
            break;

        case 'products':
            model = await Product.findById(id);

            if (!model) {
                return res.status(400).json({
                    msg: `No product with id ${id}`
                });
            }
            break;

        default:
            return res.status(500).json({ msg: 'There si no validation' });
    }

    if (model.img) {
        const pathImage = path.join(__dirname, '../uploads', collection, model.img);

        if (fs.existsSync(pathImage)) {
            fs.unlinkSync(pathImage);
        }
    }

    const fileName = await loadFile(req.files, undefined, collection);
    model.img = fileName;

    await model.save();

    res.json(model);
}

const showImage = async (req, res = response) => {
    const { id, collection } = req.params;

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);

            if (!model) {
                return res.status(400).json({
                    msg: `No user with id ${id}`
                });
            }
            break;

        case 'products':
            model = await Product.findById(id);

            if (!model) {
                return res.status(400).json({
                    msg: `No product with id ${id}`
                });
            }
            break;

        default:
            return res.status(500).json({ msg: 'There is no validation' });
    }

    if (model.img) {
        const pathImage = path.join(__dirname, '../uploads', collection, model.img);

        if (fs.existsSync(pathImage)) {
            return res.sendFile(pathImage);
        }
    }

    const pathNoImage = path.join(__dirname, '../assets/no-image.jpg');

    return res.sendFile(pathNoImage);
}

const updateImageCloudinary = async (req, res = response) => {

    const { id, collection } = req.params;

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);

            if (!model) {
                return res.status(400).json({
                    msg: `No user with id ${id}`
                });
            }
            break;

        case 'products':
            model = await Product.findById(id);

            if (!model) {
                return res.status(400).json({
                    msg: `No product with id ${id}`
                });
            }
            break;

        default:
            return res.status(500).json({ msg: 'There si no validation' });
    }

    if (model.img) {
        const nameArr = model.img.split('/');
        const name = nameArr[nameArr.length - 1];
        const [public_id] = name.split('.');
        cloudinary.uploader.destroy(public_id)
    }

    const { tempFilePath } = req.files.file;

    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

    model.img = secure_url;

    await model.save();

    res.json(model);
}

module.exports = {
    showImage,
    uploadFile,
    updateImage,
    updateImageCloudinary
}
