import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  admin: { type: Boolean, required: true, default: false },
  pastOrders: [{ type: Array, required: true, default: [] }],
  workOrders: [{ type: Array, required: true, default: [] }],
  pdfs: [{ type: Array, required: true, default: [] }],
  frontlined: { type: Number, required: true, default: 0 },
  returned: { type: Number, required: true, default: 0 },
  hours: { type: Number, required: true, default: 0 },
  verified: { type: Boolean, required: true, default: false },
});

UserSchema.pre("save", async function (next) {
  const user = this;
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
  next();
});

UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

export default mongoose.model("users", UserSchema);
