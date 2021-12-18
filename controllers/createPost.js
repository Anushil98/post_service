import { emitPost } from "../mqtt_broker/createPost.emitter";

const createPost = async (req, res) => {
  const { text, userId } = req.body;
  // code to create post
  emitPost(text, userId);
  return res.send("Post saved successfully");
};
export default createPost;
