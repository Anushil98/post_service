"user strict";
import express from "express";
import postRouter from "./routes/index.js";

const app = new express();

app.use(express.json());

app.use("/post", postRouter);

app.listen(3000, () => {
  console.log(`server up at http://localhost:3000`);
});
