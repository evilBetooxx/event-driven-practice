import { Payment } from "../payment";

export interface INotification {
    sendNotification(payment: Payment): Promise<boolean>;
}