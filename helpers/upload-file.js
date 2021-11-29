const path = require('path');
const { v4: uuidv4 } = require('uuid');

const loadFile = (files, formatsAllowed = ['png', 'jpg', 'jpeg', 'gif'], folder = '') => {

    return new Promise((resolve, reject) => {

        const { file } = files;
        const nameCut = file.name.split('.');
        const fileFormat = nameCut[nameCut.length - 1];

        if (!formatsAllowed.includes(fileFormat)) {
            return reject(`Format ${fileFormat} is not allowed, ${formatsAllowed}`)
        }

        const temporalName = uuidv4() + '.' + fileFormat;
        const uploadPath = path.join(__dirname, '../uploads/', folder, temporalName);

        file.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }

            resolve(temporalName);
        });
    });
}

module.exports = {
    loadFile
}