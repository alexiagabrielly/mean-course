const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts");

const app = express();

mongoose
  .connect(
    "mongodb+srv://alexiagabrielly:A5933b6e@cluster0-e2nmh.mongodb.net/node-angular?retryWrites=true&w=majority", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
  .then(() => {
    console.log("Deu certo!");
  })
  .catch(() => {
    console.log("deu ruim");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS, PUT"
  );
  next();
});

app.use("/api/posts", postsRoutes);

module.exports = app;
