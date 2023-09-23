const jwt = require("jsonwebtoken");
function getToken(username) {
  return jwt.sign({ username: username.id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
}

module.exports = getToken;
