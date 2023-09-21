const router = require("express").Router();
const Users = require("../models/users_models.js");
const bcrypt = require("bcryptjs");

router.post("/signup", (req, res) => {
  const user = ({ name, username, password } = req.body.user);
  user.password = bcrypt.hashSync(user.password, 8);
  Users.createNewUser(user)
    .then((response) => {
      res
        .status(201)
        .json({
          id: response.id,
          createdAt: response.created_at,
          name: response.name,
          username: response.username,
        });
    })
    .catch((error) => console.log(error));
});

router.post("/login", (req, res) => {
  const { username, name, password } = req.body.user;
});

module.exports = router;
