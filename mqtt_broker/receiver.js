import { connect } from "amqplib";
import PostRepository from "../repository/postRepository";
import mongoose from "mongoose";
connect(process.env.EVENT_BROKER_URL)
  .then((conn) => {
    process.once("SIGINT", function () {
      conn.close();
    });
    return conn.createChannel().then(function (ch) {
      mongoose
        .connect(process.env.MONGO_URL)
        .then(() => {
          console.log("Database connection Established");
          var ok = ch.assertQueue("post", { durable: false });

          ok = ok.then(function (_qok) {
            return ch.consume(
              "post",
              function (msg) {
                console.log(" [x] Received '%s'", msg.content.toString());
                const postRep = new PostRepository();
                postRep
                  .createPost(JSON.parse(msg.content.toString()))
                  .then((msg) => {
                    console.log(msg);
                  })
                  .catch((err) => {
                    console.error(err.message);
                  });
              },
              { noAck: true }
            );
          });

          return ok.then(function (_consumeOk) {
            console.log(" [*] Waiting for messages. To exit press CTRL+C");
          });
        })
        .catch((err) => {
          console.error(err);
        });
    });
  })
  .catch(console.warn);
