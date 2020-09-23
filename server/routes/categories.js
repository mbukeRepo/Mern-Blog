const router = require("express").Router();
const Category = require("../models/Category");
const Post = require("../models/Post");
const verify = require("../verifyToken");

//CREATE A CATEGORY
router.post("/", verify, async (req, res) => {
  const newCategory = new Category({
    name: req.body.name,
  });
  if (req.user.isAdmin) {
    await newCategory
      .save()
      .then((data) => res.send(data._id))
      .catch((err) => res.status(400).send(err));
  } else {
    res.status(401).json("You cannot create a category!");
  }
});

//UPDATE A CATEGORY
router.put("/:id", verify, async (req, res) => {
  await Category.findById(req.params.id)
    .then(async (category) => {
      if (req.user.isAdmin) {
        await category.updateOne({ $set: req.body });
        res.status(200).json("Category has been updated successfully");
      } else {
        res.status(401).json("You cannot create a category!");
      }
    })
    .catch((err) => res.status(404).json("Category not found"));
});

//DELETE A CATEGORY
router.delete("/:id", verify, (req, res) => {
  Category.findById(req.params.id)
    .then(async (category) => {
      if (req.user.isAdmin) {
        await category.deleteOne();
        res.status(200).json("Category has been deleted successfully");
      } else {
        res.status(401).json("You cannot delete a category!");
      }
    })
    .catch((err) => res.status(404).json("Category not found"));
});

//GET CATEGORY BY ID
router.get("/:id", async (req, res) => {
  await Category.findById(req.params.id)
    .then((category) => res.send(category))
    .catch((err) => res.status(400).json("Error " + err));
});

//GET ALL CATEGORIES
router.get("/", async (req, res) => {
  await Category.find()
    .then((categories) => res.send(categories))
    .catch((err) => res.status(400).json("Error " + err));
});

//GET ALL POSTS OF A CATEGORY
router.get("/:id/posts", async (req, res) => {
  await Post.find({ categoryId: req.params.id })
    .then((posts) => res.send(posts))
    .catch((err) => res.status(400).json("Error " + err));
});

module.exports = router;
