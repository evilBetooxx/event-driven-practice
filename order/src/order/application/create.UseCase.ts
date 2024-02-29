import { Order } from "../domain/order";
import { IOrderRepository } from "../domain/IOrderRepository";
import { NotificationNewOrder } from "./services/notificationNewOrder";
import { v4 as uuid } from "uuid";
import signale from "signale";

export class createOrderUseCase {
  constructor(
    readonly repository: IOrderRepository,
    readonly sendNotification: NotificationNewOrder
  ) {}

  async run(amount: number): Promise<void> {
    const id = uuid();
    const createdAt = new Date();
    const updatedAt = new Date();

    const order = new Order(id, amount, createdAt, updatedAt);

    try {
      await this.repository.create(order);
      await this.sendNotification.run(order);
    } catch (error) {
      signale.error(error);
    }
  }
}
