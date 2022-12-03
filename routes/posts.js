const express = require("express");
const { posts } = require("../data");

const router = express.Router();

router.route("/new-feed").get(async (req, res) => {
  res.render("home/post-feed", {
    page: { title: "MyPaws" },
    cookie: req.session.user,
  });
});
router.route("/get-feed").get(async (req, res) => {
  try {
    const result = await posts.getAllPosts();
    res.send(result);
  } catch (c) {
    res.send([]);
  }
});

router.route("/live").get(async (req, res) => {
  res.render("home/home", {
    page: { title: "MyPaws" },
    cookie: req.session.user,
  });
});

module.exports = router;