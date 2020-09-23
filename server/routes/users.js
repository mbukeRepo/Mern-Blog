const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const verify = require("../verifyToken");
const bcrypt = require("bcryptjs");

//UPDATE USER
router.put("/:id", verify, async (req, res) => {
  await User.findById(req.params.id)
    .then(async (user) => {
      if (req.user._id === req.params.id || req.user.isAdmin) {
        if (req.body.password) {
          const salt = await bcrypt.genSalt(10);
          req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        await user.updateOne({ $set: req.body });
        res.status(200).json("Account has been updated successfully");
      } else {
        res.status(401).json("You can update only your account!");
      }
    })
    .catch((err) => res.status(404).json("User not found!"));
});

//DELETE USER
router.delete("/:id", verify, (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (req.user._id === req.params.id || req.user.isAdmin) {
        user.deleteOne();
        res.status(200).json("Account has been deleted successfully");
      } else {
        res.status(401).json("You can delete only your account!");
      }
    })
    .catch((err) => res.status(404).json("User not found!"));
});

//DELETE ALL POST OF A USER
router.delete("/:id/posts", verify, (req, res) => {
  Post.find({ "user.id": req.params.id })
    .then((posts) => {
      if (req.user._id === req.params.id || req.user.isAdmin) {
        posts.map((p) => p.deleteOne());
        res
          .status(200)
          .json("All posts of the user has been deleted successfully");
      } else {
        res.status(401).json("You can delete only your posts!");
      }
    })
    .catch((err) => res.status(404).json("User not found!"));
});

//GET USER BY ID
router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      const payloadUser = { ...user._doc };
      const { password, updatedAt, ...others } = payloadUser;
      res.send(others);
    })
    .catch((err) => res.status(400).json("Error " + err));
});

//GET ALL USERS
router.get("/", (req, res) => {
  User.find()
    .then((users) => res.send(users))
    .catch((err) => res.status(400).json("Error " + err));
});

//GET ALL POSTS OF A USER
router.get("/:id/posts", (req, res) => {
  Post.find({ userId: req.params.id })
    .then((posts) => res.send(posts))
    .catch((err) => res.status(400).json("Error " + err));
});

module.exports = router;
