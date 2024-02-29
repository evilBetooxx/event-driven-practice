import { Order } from "./order";

export interface IOrderRepository {
    create(order: Order): Promise<void>;
}