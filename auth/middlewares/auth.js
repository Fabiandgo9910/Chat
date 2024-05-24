const service = require("../service");
const config = require("../config");
const jwt = require("jwt-simple");

function isAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({ menssage: "Acceso  Denegado" });
  }
  const token = req.headers.authorization.split(" ")[1];

  service
    .decodeToken(token)
    .then((response) => {
      req.user = response;
      next();
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
}
module.exports = isAuth;
