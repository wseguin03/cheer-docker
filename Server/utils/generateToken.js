const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../.env' });

require('dotenv').config();
const generateToken = (id) => {
    // console.log("Generating token for ID: ", id);
    // console.log("Using JWT_SECRET: ", process.env.JWT_SECRET);

    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });

    // console.log("Generated token: ", token);

    return token;
}

module.exports = generateToken;