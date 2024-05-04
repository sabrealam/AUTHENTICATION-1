const jwt = require("jsonwebtoken");
require('dotenv').config()


async function auth( req, res, next) {
    let token = req.headers.authorization;
    try {
        if(!token) return res.status(400).send({message : `Token not found`});
        token = token.split(` `)[1];
        let user = jwt.verify(token, process.env.SECRET_KEY);
        req.UserID = user.id;
        next();
    } catch (error) {
        res.status(500).send({def : `From Catch --> Auth` , error : error});
    }

}

module.exports = auth