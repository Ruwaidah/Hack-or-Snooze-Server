const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const secret = process.env.JWT_SECRET;

    jwt.verify(authorization, secret, function (err, decodedToken) {
      if (err) {
        res.status(401).json({ message: "Invalid Token" });
      } else {
        console.log(decodedToken)
        req.token = decodedToken;
        next();
      }
    });
  }
};
