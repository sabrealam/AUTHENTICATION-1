const jwt = require("jsonwebtoken");
require('dotenv').config()


async function auth( req, res, next) {
    let token = req.headers.authorization;
    try {
        if(!token) return res.status(400).send({message : `Token not found`});
        token = token.split(` `)[1];
        let user = jwt.verify(token, process.env.SECRET_KEY);
        
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
              console.error('Error verifying token:', err.message);
              res.status(401).send({ message: 'Invalid token' });
            }
          
            // Extract the 'data' field from the decoded token
            const data = decoded.data;
            console.log('Extracted data:', data);
            req.UserID = data.id;
            console.log(data)
            next();
          });

    } catch (error) {
        res.status(500).send({def : `From Catch --> Auth` , error : error});
    }

}

module.exports = auth