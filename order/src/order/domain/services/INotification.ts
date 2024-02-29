import { Order } from "../order";

export interface INotification {
    sendNotification(order: Order): Promise<boolean>;
}