const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");
const crypto = require("crypto");

const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  name: String,
  admin: { type: Boolean, default: false },
  password: { type: String, select: true },
  signupDate: { type: Date, default: Date.now() },
  lastlogin: Date,
});

userSchema.pre("save", function (next) {
  let user = this;
  if (!user.isModified("password")) return next();

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.gravatar = function () {
  if (!this.email) return `https://gravatar.com/avatar/?s=200&d=retro`;

  const md5 = crypto.createHash("md5").update(this.email).digest("hex");
  return `https://gravatar.com/avatr/${md5}?s200&dretro`;
};

module.exports = mongoose.model("user", userSchema);

