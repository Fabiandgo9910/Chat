const moment = require("moment");
const config = require("../config");
const jwt = require("jwt-simple");

function createToken(user) {
  const payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, "days").unix(),
  };
  return jwt.encode(payload, config.SECRET_TOKEN);
}

function decodeToken(token) {
  const decode = new Promise((resolve, reject) => {
    try {
      const payload = jwt.decode(token, config.SECRET_TOKEN);

      if (payload.exp <= moment().unix()) {
        reject({
          satatus: 401,
          sms: " el token a expirado",
        });
      }

      resolve(payload.sub);
    } catch (err) {
      reject({
        status: 500,
        sms: " invalid token ",
      });
    }
  });

  return decode;
}

module.exports = {
  createToken,
  decodeToken,
};
