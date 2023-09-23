const router = require("express").Router();
const Users = require("../models/users_models.js");
const bcrypt = require("bcryptjs");
const getToken = require("../generateToken.js");
const validateUser = require("../api/validateUser-middleware.js");
const restricted = require("../api/restricted-middleware.js");

router.post("/signup", validateUser, (req, res) => {
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

router.post("/login", validateUser, (req, res) => {
  const user = ({ username, password } = req.body.user);
  Users.findUser({ username: user.username })
    .then((response) => {
      if (response) {
        if (bcrypt.compareSync(user.password, response.user.password)) {
          const token = getToken(response);
          res.status(200).json({
            user: {
              id: response.user.id,
              createdAt: response.user.created_at,
              name: response.user.name,
              username: response.user.username,
              stories: response.stories,
              favorites: response.favorites,
            },
            token: token,
          });
        } else {
          res
            .status(400)
            .json({ message: "username or password is incorrect!" });
        }
      } else {
        res.status(400).json({
          message: "username or password is incorrect!",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "error getting the user",
      });
    });
});

// GET USER
router.get("/users/:username", restricted, (req, res) => {
  const { username } = req.params;
  console.log(username);
  Users.findUser({ username })
    .then((response) => {
      res.status(200).json({
        user: {
          id: response.user.id,
          createdAt: response.user.created_at,
          name: response.user.name,
          username: response.user.username,
          stories: response.stories,
          favorites: response.favorites,
        },
      });
    })
    .catch((error) => {
      res.status(500).json({ message: "error getting the user" });
    });
});

module.exports = router;
