import { Payment } from "../../domain/payment";
import { NewPaymentNotification } from "../../infrastructure/services/RabbitMQ/newPaymentNotification";

export class NotificationNewPayment {
  constructor(private notification: NewPaymentNotification) {}
  async run(payment: Payment): Promise<void> {
    await this.notification.sendNotification(payment);
  }
}
