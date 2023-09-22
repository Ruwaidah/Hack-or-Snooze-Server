const router = require("express").Router();
const Users = require("../models/users_models.js");
const bcrypt = require("bcryptjs");
const getToken = require("../generateToken.js");

router.post("/signup", (req, res) => {
  const user = ({ name, username, password } = req.body.user);
  user.password = bcrypt.hashSync(user.password, 8);
  Users.createNewUser(user)
    .then((response) => {
      const token = getToken(response);
      res.status(201).json({
        id: response.id,
        createdAt: response.created_at,
        name: response.name,
        username: response.username,
        token: token,
      });
    })
    .catch((error) => console.log(error));
});

router.post("/login", (req, res) => {
  const user = ({ username, password } = req.body.user);
  console.log(user)
  Users.findUser({username: user.username})
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
