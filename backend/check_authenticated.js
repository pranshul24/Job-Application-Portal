const jwt = require("jsonwebtoken");
const config = require("./config");

restrictAccess = (func) => {
    return ((req, res) => {
        let token = req.headers.authorization;

        if (!token) {
            res.statusCode = 403;
            res.setHeader('Content-Type', 'application/json');
            res.json({ err: "Unauthorized to access this page" });
            return;
        }

        [, token] = token.split(" ");

        jwt.verify(token, config.secretKey, (err, result) => {
            if (err) {
                res.statusCode = 403;
                res.setHeader('Content-Type', 'application/json');
                res.json({ err: "Unauthorized to access this page" });
                return;
            }
            else if (!err) {
                func(req, res, result);
            }
        });
    });
}

module.exports = restrictAccess