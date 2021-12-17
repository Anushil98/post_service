import { emitPost } from "../mqtt_broker/createPost.emitter";
import objectIdGenerator from "../utils/objectIdGenerator";

const createPost = async (req, res) => {
  const { text } = req.body;
  // code to create post
  emitPost(text, objectIdGenerator());
  return res.send("Post saved successfully");
};
export default createPost;
