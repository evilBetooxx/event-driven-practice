import { createOrderUseCase } from "../application/create.UseCase";
import { NotificationNewOrder } from "../application/services/notificationNewOrder";
import { CreateOrderController } from "./controllers/createOrder.controller";
import { OrderRepositoryPrisma } from "./orderRepositoryPrisma";
import { NewOrderNotification } from "./services/RabbitMQ/newOrderNotification";

export const repository = new OrderRepositoryPrisma();
export const notificationNewOrder = new NewOrderNotification();
export const serviceNotification = new NotificationNewOrder(
  notificationNewOrder
);

export const createOrder = new createOrderUseCase(
  repository,
  serviceNotification
);
export const createOrderController = new CreateOrderController(createOrder);
