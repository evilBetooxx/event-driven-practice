import { createPaymentUseCase } from "../application/create.UseCase";
import { CreatePaymentController } from "./controllers/createPayment.controller";
import { PaymentRepositoryPrisma } from "./paymentRepositoryPrisma";
import { NewPaymentNotification } from "./services/RabbitMQ/newPaymentNotification";
import { NotificationNewPayment } from "../application/services/notificationNewPayment";

export const repository = new PaymentRepositoryPrisma();
export const notificationNewPayment = new NewPaymentNotification();
export const serviceNotification = new NotificationNewPayment(
  notificationNewPayment
);

export const createPayment = new createPaymentUseCase(
  repository,
  serviceNotification
);
export const createPaymentController = new CreatePaymentController(
  createPayment
);
