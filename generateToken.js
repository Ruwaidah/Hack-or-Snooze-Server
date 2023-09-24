const jwt = require("jsonwebtoken");
function getToken(user) {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
}

module.exports = getToken;
