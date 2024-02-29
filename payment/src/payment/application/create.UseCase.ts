import { Payment } from "../domain/payment";
import { IPaymentRepository } from "../domain/IPaymentRepository";
import { NotificationNewPayment } from "./services/notificationNewPayment";
import signale from "signale";

export class createPaymentUseCase {
  constructor(readonly repository: IPaymentRepository, readonly sendNotification: NotificationNewPayment) {}

  async run(amount: number): Promise<void> {
    const createdAt = new Date();
    const updatedAt = new Date();

    const pay = new Payment(amount, createdAt, updatedAt);

    try {
      await this.repository.create(pay);
      await this.sendNotification.run(pay);
    } catch (error) {
      signale.error(error);
    }
  }
}
