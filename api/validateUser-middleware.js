module.exports = (req, res, next) => {
  console.log(req.params);
  console.log(req.query);
  console.log(req.url);
  const { username, name, password } = req.body.user;
  if (password && username && name && req.url == "/signup") next();
  else if (password && username && req.url == "/login") next();
  else res.status(400).json({ message: "Please fill out all required fields" });
};
