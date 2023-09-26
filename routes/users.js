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
        user: {
          id: response.id,
          createdAt: response.created_at,
          name: response.name,
          username: response.username,
          stories: [],
          favorites: [],
        },
        token: token,
      });
    })
    .catch((error) => {
      if (error.code === "23505")
        res.status(500).json({ message: "username already exists" });
      else res.status(500).json({ message: "Error Creating user" });
    });
});

router.post("/login", validateUser, (req, res) => {
  const user = ({ username, password } = req.body.user);
  Users.findUser({ username: user.username })
    .then((response) => {
      if (response) {
        if (bcrypt.compareSync(user.password, response.user.password)) {
          const token = getToken(response.user);
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
  Users.findUser({ username })
    .then((response) => {
      console.log(response);
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

// UPDATE USER
router.patch("/users/:username", (req, res) => {
  const user = ({ username, name, password } = req.body.user);
  if (req.body.user.password) {
    req.body.user.password = bcrypt.hashSync(req.body.user.password, 8);
  }
  Users.updateUser(req.body.user)
    .then((response) => {
      console.log("getuser ", response);
      if (response) res.status(200).json({ message: "Successfully update" });
    })
    .catch((error) =>
      res.status(500).json({ message: "error update the user" })
    );
});

router.post("/users/:username/favorites/:storyId", restricted, (req, res) => {
  Users.addTofavorites({ user_id: req.token.id, story_id: req.params.storyId })
    .then((response) => {
      res.status(200).json({ user: response });
    })
    .catch((error) =>
      res.status(500).json({ message: "Error adding to favorites" })
    );
});

router.delete("/users/:username/favorites/:storyId", restricted, (req, res) => {
  console.log(req.params)
  Users.deleteFromfavorites({
    user_id: req.token.id,
    story_id: req.params.storyId,
  })
    .then((response) => {
      res.status(200).json({ user: response });
    })
    .catch((error) =>
      res.status(500).json({ message: "Error remove from favorites" })
    );
});

module.exports = router;
