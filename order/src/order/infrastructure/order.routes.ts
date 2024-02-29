import { Router } from "express";
import { createOrderController } from "./dependencies";

export const OrderRouter = Router();

OrderRouter.post("/", createOrderController.run.bind(createOrderController));