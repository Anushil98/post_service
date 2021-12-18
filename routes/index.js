import { Router } from "express";
import createPost from "../controllers/createPost";
import updatePost from "../controllers/updatePost";
import deletePost from "../controllers/deletePost";
import getPosts from "../controllers/getPosts";
import authChecker from "../middlewares/authChecker";

const postRouter = Router();

postRouter.post("/entry", authChecker, createPost);
postRouter.put("/entry", updatePost);
postRouter.delete("/entry", deletePost);
postRouter.get("/entry", getPosts);

export default postRouter;
