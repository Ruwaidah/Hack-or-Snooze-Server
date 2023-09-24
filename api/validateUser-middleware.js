module.exports = (req, res, next) => {
  const { username, name, password } = req.body.user;
  if (password && username && name && req.url == "/signup") next();
  else if (password && username && req.url == "/login") next();
  else res.status(400).json({ message: "Please fill out all required fields" });
};
