import ch from "./send";

const q = "post";

const queue = ch.assertQueue(q, { durable: false });

export const emitPost = (text, userId) => {
  const msg = Buffer.from(JSON.stringify({ userId, text }));
  return new Promise((resolve, reject) => {
    queue
      .then(function (_qok) {
        ch.sendToQueue(q, msg);
        console.log(" [x] Sent '%s'", msg);
        resolve("Post Event Emitted Succesfully");
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};
