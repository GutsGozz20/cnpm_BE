const express = require('express');
const app = express();
const cors = require("cors");
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const Router = require('./routes');

// middleware

app.use(cors({ "origin": "*"}));
app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse application/json

const PORT = process.env.PORT || 5000;

const URL = "mongodb+srv://root:2002@cluster0.f7zrmfr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectDB = async () => {
  try {
    await mongoose.connect(
      URL
    )
    console.log('Connected to mongoDB')
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

connectDB()

Router(app)

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
