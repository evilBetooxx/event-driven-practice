import { Request, Response } from "express";
import { createOrderUseCase } from "../../application/create.UseCase";

export class CreateOrderController {
  constructor(private createOrderUseCase: createOrderUseCase) {}

  async run (req: Request, res: Response): Promise<void> {
    const { amount } = req.body;
    try {
        const order = await this.createOrderUseCase.run(amount);
        res.status(201).send(order);
    } catch (error) {
      console.log(error);
    }
  }
}
