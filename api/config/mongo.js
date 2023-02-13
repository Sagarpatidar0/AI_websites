const mongoose = require('mongoose');
mongoose.set("strictQuery", false);

mongoose.connect("mongodb+srv://sagar_root:EmCE6CBODp3DZWBI@cluster0.sc45epr.mongodb.net/?retryWrites=true&w=majority",
{
    dbName: "AI_Images",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) =>
    err ? console.log(err) : console.log(
      "Connected to AI_Images database")
);

module.exports = mongoose.connection;