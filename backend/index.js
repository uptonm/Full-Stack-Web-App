const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require('dotenv').config()

// Prevent false depreciation warning on collection.findOneAndUpdate command
mongoose.set("useFindAndModify", false);

mongoose.connect(
  `mongodb://${process.env.USER}:${process.env.PASSWORD}@ds051833.mlab.com:51833/uptonm-fullstackblog`,
  { useNewUrlParser: true }
);

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("./routes/user.routes")(app);
require("./routes/post.routes")(app);
require("./routes/comment.routes")(app);

const port = 8000 || proccess.env.PORT;
app.listen(port, () => {
  console.log(`Listening for requests on port ${port}`);
});
