import mongoose from "mongoose";

const brandSchema = mongoose.Schema(
  {
    brandname: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Brand", brandSchema);
