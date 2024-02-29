import { Order } from "../../domain/order";
import { NewOrderNotification } from "../../infrastructure/services/RabbitMQ/newOrderNotification";

export class NotificationNewOrder {
  constructor(private notification: NewOrderNotification) {}
  async run (order: Order): Promise<void> {
    await this.notification.sendNotification(order);
  }
}
