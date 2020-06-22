const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
var cors = require("cors");

//routes
const story = require("./routes/stories");

const app = express();

//@ mongodb connection
const db = require("./config/mongoDb").mongoURI;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log("Mongodb Connected"))
  .catch(err => console.log(err));
mongoose.Promise = global.Promise;

app.use( 
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

app.use(cors());
 
//express app routes
app.use("/api/story", story);

//listen for request
app.listen(process.env.PORT || 4200, () => {
  console.log("now listening for request");
});