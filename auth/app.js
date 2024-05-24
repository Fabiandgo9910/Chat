"use strict";

const express = require("express");
const bodypParser = require("body-parser");
const app = express();
const api = require("./routes");
const { engine } = require("express-handlebars");
const cors = require("cors")

app.use(cors())
app.use(bodypParser.urlencoded({ extended: false }));
app.use(bodypParser.json());
app.use(express.static("public"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./view");

app.use("/api", api);
app.get("/signin", (req, res) => {
  res.render("login");
});
app.get("/", (req, res) => {
  res.render("splash");
});
app.get("/signup", (req, res) => {
  res.render("signup");
});
app.get("/home", (req, res) => {
  res.render("home");
});
app.get("/agregar", (req, res) => {
  res.render("agregar");
});
app.get("/editar", (req, res) => {
  res.render("editar");
});
app.get("/eliminar", (req, res) => {
  res.render("eliminar");
});


module.exports = app;




