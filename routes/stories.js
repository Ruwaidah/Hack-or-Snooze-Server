const router = require("express").Router();
const Stories = require("../models/stories_models.js");
const restricted = require("../api/restricted-middleware.js");

// GET ALL STORIES
router.get("/", (req, res) => {
  Stories.getAllStories()
    .then((response) => {
      res.status(200).json({ stories: response });
    })
    .catch((error) =>
      res.status(500).json({ message: "Error Geting Stories" })
    );
});

// ADD NEW STORY
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
        res.status(200).json({ story: response });
      })
      .catch((error) =>
        res.status(500).json({ message: "Error adding story " })
      );
  } else res.status(500).json({ message: "Invalid URL" });
});

router.patch("/:storyId", restricted, (req, res) => {
  const id = req.params.storyId;
  Stories.updateStory({ id }, req.body.story)
    .then((response) => {
      res.status(200).json({ message: "Successfully update" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error update story" });
    });
});

module.exports = router;
