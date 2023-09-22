const jwt = require("jsonwebtoken");
function getToken(username) {
  jwt.sign({ username: username.id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
}

module.exports = getToken
