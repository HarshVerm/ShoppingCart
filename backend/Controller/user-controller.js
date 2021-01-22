const User = require("../Models/user");
const bcrypt = require("bcrypt");

const {
  registerValidation,
  loginValidation,
} = require("../Middleware/validation");
const { connect } = require("mongoose");

const register = async (req, res, next) => {
  const { error } = registerValidation(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res.status(400).send({ error: true, msg: "Email already exist." });
  }

  console.log(emailExist);

  const hashedPassword = await bcrypt.hash(
    req.body.password,
    await bcrypt.genSalt(10),
  );
  const user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.send({
      error: false,
      messsage: "Registeration Successful",
      userInfo: savedUser,
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

const login = async (req, res, next) => {
  console.log(req.body);
  const { error } = loginValidation(req.body);
  console.log(error);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user) {
    return res.status(400).send("Email is not registerd");
  }

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    return res.status(400).send("Invalid password");
  }
  return res.status(200).send(user);
};

module.exports = { register, login };

//
// const register = async (req, res, next) => {
//   User.find({ email: req.body.email })
//     .then((data) => {
//       if (data.length === 0) {
//         const newUser = new User(req.body);
//         newUser.save().then(() =>
//           res.status(200).send({
//             error: false,
//             messsage: "Registeration Successful",
//             userInfo: newUser,
//           }),
//         );
//       } else {
//         console.log(data);
//         res.status(409).send({ error: true, message: "User already exist" });
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(400).send(err);
//     });
// };
//
// const login = (req, res) => {
//   User.findOne({ email: req.body.email, password: req.body.password })
//     .then((data) => {
//       if (data.length != 0) {
//         return res.status(200).json(data);
//       }
//       return res.status(404).send({ Error: "User Not Found" });
//     })
//     .catch((err) => res.status(400).send("error", err));
// };
