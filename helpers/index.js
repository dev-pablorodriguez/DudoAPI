const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const encryptPassword = rawPassword => {
    const salt = bcrypt.genSaltSync(5);
    return bcrypt.hashSync(rawPassword, salt);
}

const validatePassword = (rawPassword, encryptedPassword) => {
    return bcrypt.compareSync(rawPassword, encryptedPassword);
}

const generateJwt = (uid, name) => {
    return new Promise((resolve, reject) => {

        const payload = { uid, name };

        jwt.sign(payload, process.env.JWT_SEED, {
            expiresIn: '2h'
        }, (error, token) => {
            if(error){
                console.log(error);
                reject('Unable to generate JWT.');
            }

            resolve(token);
        });

    });
}

module.exports = {
    encryptPassword,
    validatePassword,
    generateJwt
}