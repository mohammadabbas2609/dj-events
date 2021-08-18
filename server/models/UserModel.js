import brcypt from "bcryptjs";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    role: {
      type: String,
      enum: ["moderator", "admin"],
      default: "moderator",
    },
  },
  { timestamps: true }
);

UserSchema.methods.comparePassword = async function (password) {
  return await brcypt.compare(password, this.password);
};

UserSchema.pre("save", async function (next) {
  if (this.directModifiedPaths().includes("password")) {
    const salt = await brcypt.genSalt(10);
    this.password = await brcypt.hash(this.password, salt);
  }

  next();
});

const UserModel = mongoose.model("user", UserSchema);

export default UserModel;
