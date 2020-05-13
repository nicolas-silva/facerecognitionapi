module.exports = {
  handleUsers: (res, db) => {
    db.getAllUsers((err, data) => {
      if (err) {
        res.status(500).json("Fail");
      }
      res.json(data);
    });
  },
};
