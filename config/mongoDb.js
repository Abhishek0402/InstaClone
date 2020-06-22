const dotenv = require('dotenv');

dotenv.config()

module.exports = {
    mongoURI: process.env.MONGO_URI,
    secret0rKey: 'SECRET'
};