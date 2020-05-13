const Clarifai = require("clarifai");
const clarifai = new Clarifai.App({
  apiKey: "<YOUR CLARIFAI API KEY>",
});

module.exports = {
  handleProfileGet: (req, res, db) => {
    const { id } = req.params;
    db.findUserId(id, (err, data) => {
      console.log("data", data);
      if (err) {
        res.status(400).json("Not Found");
      }
      res.json(data);
    });
  },
  handleProfilePut: (req, res, db) => {
    const user = req.body;
    console.log(user);
    db.updateEntries(user, (err, data) => {
      console.log("data", data);
      if (err) {
        res.status(400).json("Not Found");
      }
      if (data.value) {
        res.json(data.value.entries);
      } else {
        res.status(400).json("Not Found");
      }
    });
  },
  handleImageAPI: (req, res) => {
    clarifai.models
      .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
      .then(data => {
        res.json(data)
      })
      .catch(err => res.status(400).json('Unable to work with Clarifai'));
    }
};
