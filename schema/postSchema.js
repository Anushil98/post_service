import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const postSchema = new Schema({
  userId: { type: ObjectId, required: true },
  text: { type: String, default: "" },
  createdAt: { type: Date, default: new Date() },
});

const PostModel = mongoose.model("post", postSchema);

export default PostModel;
