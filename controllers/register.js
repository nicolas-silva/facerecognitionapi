module.exports = {
  handleRegister: (req, res, db) => {
    const user = req.body;
    if (user.email !== "" && user.name !== "" && user.password !== "") {
      db.findUserEmail(user.email, (err, data) => {
        if (data) {
          res.status(400).json("User email already in use");
        } else {
          db.registerUser(user, (err, data) => {
            if (err) {
              res.status(400).json("Invalid data");
            }
            res.json(data.ops[0]);
          });
        }
      });
    } else {
      res.status(400).json("Invalid Data");
    }
  },
};
