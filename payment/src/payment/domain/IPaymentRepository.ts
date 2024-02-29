import { Payment } from "./payment";

export interface IPaymentRepository {
    create(payment: Payment): Promise<void>;
}
