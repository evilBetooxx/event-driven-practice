import { createPaymentUseCase } from "../application/create.UseCase";
import { CreatePaymentController } from "./controllers/createPayment.controller";
import { PaymentRepositoryPrisma } from "./paymentRepositoryPrisma";

export const repository = new PaymentRepositoryPrisma();

export const createPayment = new createPaymentUseCase(repository);
export const createPaymentController = new CreatePaymentController(createPayment);
