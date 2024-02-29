import { PrismaClient } from "@prisma/client";
import { IPaymentRepository } from "../domain/IPaymentRepository";
import { Payment } from "../domain/payment";
import signale from "signale";

export class PaymentRepositoryPrisma implements IPaymentRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(payment: Payment): Promise<void> {
    const newPayment = await this.prisma.payment.create({
      data: {
        total: payment.total,
        createdAt: payment.createdAt,
        updatedAt: payment.updatedAt,
      },
    });
    signale.success(`Pago recibido: ${newPayment.total} - ${newPayment.id}`);
  }
}
