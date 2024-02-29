import { Payment } from "../domain/payment";
import { IPaymentRepository } from "../domain/IPaymentRepository";
import signale from "signale";

export class createPaymentUseCase {
  constructor(readonly repository: IPaymentRepository) {}

  async run(amount: number): Promise<void> {
    const createdAt = new Date();
    const updatedAt = new Date();

    const order = new Payment(amount, createdAt, updatedAt);

    try {
      await this.repository.create(order);
    } catch (error) {
      signale.error(error);
    }
  }
}
