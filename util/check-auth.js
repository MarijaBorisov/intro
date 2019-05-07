const jwt = require('jsonwebtoken');

var secretWord = process.env.SECRETWORD;

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, secretWord);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).send({
            message: 'Authorization failed'
        });
    }
};