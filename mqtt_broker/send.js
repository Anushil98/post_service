import { connect } from "amqplib";
const connection = await connect(process.env.EVENT_BROKER_URL);
const channel = await connection.createChannel();
console.log("Event Broker connection established");
process.on("SIGINT", () => {
  connection.close();
  console.log("Connection to Event Broker Closed");
});
export default channel;
