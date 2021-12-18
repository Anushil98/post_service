import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const authChecker = async (req, res, next) => {
  try {
    const authToken = req.headers["authorization"];
    if (authToken) {
      const token = authToken.replace("Bearer ", "");
      const publickey = fs.readFileSync(
        path.resolve(__dirname, "../../config/public.key")
      );
      try {
        const payload = jwt.verify(token, publickey);
        const userId = payload.data.userId.toString();
        req.body["userId"] = userId;
        next();
      } catch (err) {
        console.error(err);
        return res.status(401).send("Not Authorised!");
      }
    }
    return res.status(401).send("Not Authorised!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

export default authChecker;
