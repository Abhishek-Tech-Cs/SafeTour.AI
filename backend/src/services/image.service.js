const imagekit = require('../config/imagekit');

async function uploadImage(file) {
    try {
        const uploadResponse = await imagekit.upload({
            file: file.buffer,
            fileName: file.originalname,
        });

        return {
            url: uploadResponse.url,
            fileId: uploadResponse.fileId
        };

    } catch (error) {
        const err = new Error('Image upload failed');
        err.statusCode = 500;
        throw err;
    }
}

async function deleteImage(fileId) {
    try {
        await imagekit.deleteFile(fileId);
    } catch (error) {
        const err = new Error('Image deletion failed');
        err.statusCode = 500;
        throw err;
    }
}

module.exports = {
    uploadImage,
    deleteImage
};