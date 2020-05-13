module.exports = {
  handleSignin: (req, res, db, bcrypt) => {
    console.log("signIn", new Date());
    const user = req.body;
    db.findUserEmail(user.email, (err, data) => {
      if (err) {
        res.status(400).json("Not Found");
      }
      bcrypt.compare(user.password, data.password, function (err, response) {
        if (response) {
          res.json(data);
        } else {
          res.status(400).json("Not Found");
        }
      });
    });
  },
};
