const router = require("express").Router();

router.post("/signup", (req, res) => {
  const {username, name, password} = req.body.user
  
});

router.post("/login", (req, res) => {
  const {username, name, password} = req.body.user
});


module.exports = router;
