"user strict";
import express from "express";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

const app = new express();

app.use(express.json());
app.post("/testAuth", (req, res) => {
  const authToken = req.headers["authorization"];
  if (authToken) {
    const token = authToken.replace("Bearer ", "");
    const publickey = fs.readFileSync(
      path.resolve(path.dirname("./"), "../config/public.key")
    );
    try {
      const payload = jwt.verify(token, publickey);
      console.log(payload);
      return res.send("Authorization Succesfull");
    } catch (err) {
      console.error(err);
      return res.status(401).send("Not Authorised!");
    }
  }
  return res.status(401).send("Not Authorised!");
});

app.listen(3000, () => {
  console.log(`server up at http://localhost:3000`);
});
