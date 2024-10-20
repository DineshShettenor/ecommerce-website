const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: { type: String, require: true, unique: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  role: { type: String, default: "user" },
  profileImage: String,
  bio: { type: String, maxlength: 200 },
  profession: String,
  createdAt: { type: Date, default: Date.now },
});

// hashing password
userSchema.pre("save", async function(next){
  const user = this;
  if (!user.isModified("password")) return next();
  const hashPassword = await bcrypt.hash(user.password, 10);
  user.password = hashPassword;
  next();
});

// match password
userSchema.methods.comparePassword = function(userPassword){
    return bcrypt.compare(userPassword, this.password);
}

const User = new model("User", userSchema);
module.exports = User;