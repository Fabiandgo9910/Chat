"use strict";

const express = require("express");
const api = express.Router();
const auth = require("../middlewares/auth");
const userCtrol = require("../controllers/user");


 
api.get("/user/", userCtrol.getUser);
api.get("/activo", auth, function (req, res) {
  res.status(200).send({ sms: "tienes acceso" });
});
api.post("/signUp", userCtrol.signUp);
api.post("/signIn", userCtrol.signIn);
api.delete('/eliminarUser', userCtrol.deleteUser);
api.put('/User', userCtrol.upadateUser);
api.get('/User/user', userCtrol.getUsuario);
module.exports = api;

