require('dotenv').config();
module.exports = {
    secret: process.env.AUTH_SECRET ?? 'secret',
    jwtExpiration: 60,
    jwtRefreshExpiration: 300,
}