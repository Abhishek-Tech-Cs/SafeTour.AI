const ImageKit = require("imagekit");
const env = require("./env");

const imagekit = new ImageKit({
    publicKey: env.imagekit_public_key,
    privateKey: env.imagekit_private_key,
    urlEndpoint: env.imagekit_url_endpoint
});

module.exports = imagekit;  