const router = require("express").Router();
const User = require("../models/User");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.route("/register").post(async (req, res) => {
  //JOI VALIDATION
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //UNIQUE USERNAME AND EMAIL VALIDATION
  const nameExist = await User.findOne({ name: req.body.name });
  if (nameExist) return res.status(400).send("Name allready exists");

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email allready exists");

  //HASH THE PASSWORD
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    profilePicture: "noAvatar.png",
    isAdmin: false,
  });

  await newUser
    .save()
    .then((data) => res.send(data._id))
    .catch((err) => res.status(400).send(err));
});

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email does not exist!");
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password");

  //Create a token
  const token = jwt.sign(
    { _id: user._id, name:user.name, isAdmin: user.isAdmin },
    process.env.TOKEN_SECRET
  );
  const payloadUser = { ...user._doc };
  const { password, updatedAt, ...others } = payloadUser;
  res.header("auth-token", token).send({ ...others, token });
});

module.exports = router;
