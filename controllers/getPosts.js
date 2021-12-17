import PostModel from "../schema/postSchema";

const getPosts = async (req, res) => {
  // code to create post
  const posts = await PostModel.find();
  return res.send(posts);
};
export default getPosts;
