const router = require("express").Router();
const Comment = require("../models/Comment");

//GET COMMENT BY ID
router.get("/:id", (req, res) => {
  Comment.findById(req.params.id)
    .then((comment) => res.send(comment))
    .catch((err) => res.status(400).json("Error " + err));
});

module.exports = router;
