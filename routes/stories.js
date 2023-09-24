const router = require("express").Router();
const Stories = require("../models/stories_models.js");
const restricted = require("../api/restricted-middleware.js");
const { response } = require("../api/server.js");

// GET ALL STORIES
router.get("/", (req, res) => {
  Stories.getAllStories()
    .then((response) => {
      console.log(response)
      res.status(200).json({ stories: response });
    })
    .catch((error) =>
      res.status(500).json({ message: "Error Geting Stories" })
    );
});
router.post("/", restricted, (req, res) => {
  const urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  if (urlPattern.test(req.body.story.url)) {
    Stories.addStory({ ...req.body.story, user_id: req.token.id })
      .then((response) => {
        console.log("response",response);
        res.status(200).json(response);
      })
      .catch((error) => console.log(error));
  } else res.status(500).json({ message: "Invalid URL" });
});

module.exports = router;
