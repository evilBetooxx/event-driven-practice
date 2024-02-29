import express from "express";
import { connect, Channel } from "amqplib";
import axios from "axios";

const app = express();
const port = 4000;

async function startConsumer() {
  try {
    const connection = await connect(process.env.CLOUDAMQP_URL || "");
    const channel: Channel = await connection.createChannel();
    const queue = "initial";
    await channel.assertQueue(queue, { durable: false });

    channel.consume(queue, async (message) => {
      if (message !== null) {
        const payment = message.content.toString();
        console.log("Orden recibida: ", payment);
        try {
          await axios.post(process.env.PAYMENT_URL || "", JSON.parse(payment));
          console.log("Pago enviado al servicio de pagos");
        } catch (error) {
          console.log(error);
        }
        channel.ack(message);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

startConsumer()

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});