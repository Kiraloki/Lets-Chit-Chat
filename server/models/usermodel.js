const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pic: {
      type: String,
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  {
    timestamp: true,
  }
);

userSchema.methods.matchPassword = async function (
  enteredPassword,
  hashedPassword
) {
  // const salt = await bcrypt.genSalt(10);
  // const newenc = await bcrypt.hash(enteredPassword, salt);
  // const oldenc = await bcrypt.hash("123456", salt);
  // const checkenc = await bcrypt.hash("123456", salt);
  // const ch = await bcrypt.compare("12345", hashedPassword);
  // const ch1 = await bcrypt.compare(enteredPassword, hashedPassword);

  // setTimeout(function () {
  //   console.log(ch, ch1);
  // }, 6000);

  // newwnc && console.log(newenc, this.password);

  const result = await bcrypt.compare(enteredPassword, hashedPassword);

  // console.log(result);

  // return await bcrypt.compare(enteredPassword, hashedPassword);
  return result;
};

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
