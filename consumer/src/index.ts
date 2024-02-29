import express from "express";
import { connect } from "amqplib";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 4000;

async function startConsumer() {
  try {
    const connection = await connect(process.env.CLOUDAMQP_URL || "");
    const channel = await connection.createChannel();
    const queue = "initial";

    channel.consume(queue, async (message) => {
      if (message !== null) {
        const payment = JSON.parse(message.content.toString());
        const amount = parseInt(payment.amount); 
        console.log("Orden recibida, pago de: $", amount);
        try {
          await axios.post(process.env.PAYMENT_URL || "", {
            total: amount,
          });
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