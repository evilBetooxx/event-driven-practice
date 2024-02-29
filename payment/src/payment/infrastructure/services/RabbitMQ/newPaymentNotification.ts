import { INotification } from "../../../domain/services/INotification";
import amqplib from "amqplib";
import { Payment } from "../../../domain/payment";

export class NewPaymentNotification implements INotification {
  private url: string;
  private exchange: string;
  private queue: string;
  private typeExchange: string;

  constructor() {
    this.url = process.env.AMQP_URL || "";
    this.exchange = process.env.AMQP_EXCHANGE || "";
    this.queue = process.env.AMQP_QUEUE || "";
    this.typeExchange = process.env.AMQP_TYPE_EXCHANGE || "";
  }

  async sendNotification(payment: Payment): Promise<boolean> {
    let conn, ch;
    try {
      conn = await amqplib.connect(this.url);
      ch = await conn.createChannel();
      await ch.assertExchange(this.exchange, this.typeExchange, {
        durable: true,
      });
      await ch.assertQueue(this.queue, { durable: true });
      await ch.bindQueue(this.queue, this.exchange, "");
      const status = await ch.publish(
        this.exchange,
        "",
        Buffer.from(JSON.stringify(payment))
      );
      console.log("Contenido del mensaje:", JSON.stringify(payment));
      console.log("Estatus:", status);
      return status;
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      return false;
    } finally {
      if (ch) {
        await ch.close();
        console.log("Canal cerrado");
      }
      if (conn) {
        await conn.close();
        console.log("Conexión cerrada");
      }
    }
  }
}
