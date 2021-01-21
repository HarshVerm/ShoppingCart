const User = require("../Models/user");

const register = (req, res) => {
  User.find({ email: req.body.email })
    .then((data) => {
      if (data.length === 0) {
        const newUser = new User(req.body);
        newUser.save().then(() =>
          res.status(200).send({
            error: false,
            messsage: "Registeration Successful",
            userInfo: newUser,
          }),
        );
      } else {
        console.log(data);
        res.status(409).send({ error: true, message: "User already exist" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
};

const login = (req, res) => {
  User.findOne({ email: req.body.email, password: req.body.password })
    .then((data) => {
      if (data.length != 0) {
        return res.status(200).json(data);
      }
      return res.status(404).send({ Error: "User Not Found" });
    })
    .catch((err) => res.status(400).send("error", err));
};

module.exports = { register, login };
