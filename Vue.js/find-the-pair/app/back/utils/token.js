const jwt = require('jsonwebtoken');

const expiresIn = '60m'
const tokenKey = 'A-Ba-Ba-Ga-La-Ma-Ga'   // Save in .env !!!

function parseBearer(bearer, headers) {
    let token=null
    if (bearer.startsWith('Bearer ')) {
       token = bearer.slice(7, bearer.length);
    }    
    const decoded = jwt.verify(token, prepareSecret(headers));
    return decoded;
}

function prepareToken(data, headers) {
    return jwt.sign(data, prepareSecret(headers), { expiresIn: '60m'});
}

function prepareSecret(headers) {
    return tokenKey + headers['user-agent'] + headers['accept-language'];
}

module.exports = { parseBearer, prepareToken };