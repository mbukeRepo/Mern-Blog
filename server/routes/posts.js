const router = require("express").Router();
const { update } = require("../models/Post");
const Post = require("../models/Post");
const verify = require("../verifyToken");

//CREATE A POST
router.post("/", verify, async (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    desc: req.body.desc,
    photo: req.body.photo,
    user: { name: req.user.name, id: req.user._id },
    categories: req.body.categories,
  });
  await newPost
    .save()
    .then((data) => res.send(data._id))
    .catch((err) => res.status(400).send(err));
});

//UPDATE A POST
router.put("/:id", verify, async (req, res) => {
  Post.findById(req.params.id)
    .then(async (post) => {
      if (req.user._id === post.user.id || req.user.isAdmin) {
        await post.updateOne({ $set: req.body });
        res.status(200).json("Post has been updated successfully");
      } else {
        res.status(401).json("You can update only your posts");
      }
    })
    .catch((err) => res.status(404).json("Post not found"));
});

//DELETE A POST
router.delete("/:id", verify, async (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (req.user._id === post.userId || req.user.isAdmin) {
        post.deleteOne();
        res.status(200).json("Post has been deleted successfully");
      } else {
        res.status(401).json("You can delete only your posts!");
      }
    })
    .catch((err) => res.status(404).json("Post not found!"));
});

//GET POST BY ID
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => res.send(post))
    .catch((err) => res.status(400).json("Error " + err));
});

//GET ALL POSTS
router.get("/", (req, res) => {
  Post.find()
    .then((posts) => res.send(posts))
    .catch((err) => res.status(400).json("Error " + err));
});

module.exports = router;
