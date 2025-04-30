import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Title is required"],
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
    },
    link1: {
      type: String,
    },
    link2: {
      type: String,
    },
    link3: {
      type: String,
    },
    link4: {
      type: String,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
    versionKey: false, // disables __v
  }
);

const postModel = mongoose.model("Post", postSchema);
export default postModel;
