import { Request, Response } from "express";
import { createPaymentUseCase } from "../../application/create.UseCase";

export class CreatePaymentController {
  constructor(private createPaymentUseCase: createPaymentUseCase) {}

  async run (req: Request, res: Response): Promise<void> {
    const { total } = req.body;
    try {
        const pay = await this.createPaymentUseCase.run(total);
        res.status(201).send(pay);
    } catch (error) {
      console.log(error);
    }
  }
}
