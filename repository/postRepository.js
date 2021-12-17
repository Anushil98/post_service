import PostModel from "../schema/postSchema";

class PostRepository {
  createPost = async (data) => {
    const { userId, text } = data;
    const newPost = new PostModel();
    newPost.text = text;
    newPost.userId = userId;
    await newPost.save();
    return "Post created Successfully";
  };
}

export default PostRepository;
