import { Router } from "express";
import { createPaymentController } from "./dependencies";

export const PaymentRouter = Router();

PaymentRouter.post("/", createPaymentController.run.bind(createPaymentController));