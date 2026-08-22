const generateRandomToken = require('../utils/generateRandomToken')
const generateAccessToken = require('../utils/generateAccessToken')
const hashRandomToken = require('../utils/hashRandomToken')
const env = require('../config/env')
const RefreshTokenModel = require('../models/refreshToken.model')
const User = require('../models/user.model')

async function createRefreshToken(userId) {
    const refreshToken = generateRandomToken()
    const hashedRefreshToken = hashRandomToken(refreshToken)

    const expiresAt = new Date(
        Date.now() +
        env.refresh_token_expiry_days * 24 * 60 * 60 * 1000
    );

    await RefreshTokenModel.create({
        user:userId,
        tokenHash:hashedRefreshToken,
        expiresAt,
        revokedAt:null
    })

    return refreshToken
}

async function findValidRefreshToken(rawToken) {
    const hashedRefreshToken = hashRandomToken(rawToken);
    const refreshToken = await RefreshTokenModel.findOne({
        tokenHash: hashedRefreshToken,
        revokedAt: null,
        expiresAt: { $gt: new Date() }
    });

    return refreshToken
}

async function revokeRefreshToken(refreshTokenId){
    return await RefreshTokenModel.findByIdAndUpdate(
        refreshTokenId,
        { revokedAt : new Date() },
        { returnDocument: 'after' }
    )
}

async function refreshAccessToken(rawToken) {
    const refreshToken = await findValidRefreshToken(rawToken)
    if(!refreshToken){
        const error = new Error("Unauthorized access");
        error.statusCode = 401;
        throw error;
    }
    const user = await User.findById(refreshToken.user)
    if(!user){
        const error = new Error("Unauthorized access");
        error.statusCode = 401;
        throw error;
    }

    await revokeRefreshToken(refreshToken.id)

    const newRefreshToken = await createRefreshToken(user.id)

    const newAccessToken = generateAccessToken(user)

    return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
    };
}

async function revokeRefreshTokenByRawToken(rawToken) {
    const tokenHash = hashRandomToken(rawToken);

    return await RefreshTokenModel.findOneAndUpdate(
        { tokenHash },
        { revokedAt: new Date() },
        { returnDocument: 'after' }
    );
}

async function revokeAllRefreshTokens(userId) {
    return await RefreshTokenModel.updateMany(
        {
            user: userId,
            revokedAt: null
        },
        {
            revokedAt: new Date()
        }
    );
}


module.exports = {
    createRefreshToken,
    refreshAccessToken,
    revokeRefreshTokenByRawToken,
    revokeAllRefreshTokens
};
