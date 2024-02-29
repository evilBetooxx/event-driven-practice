import { PrismaClient } from "@prisma/client";
import { IOrderRepository } from "../domain/IOrderRepository";
import { Order } from "../domain/order";
import signale from "signale";

export class OrderRepositoryPrisma implements IOrderRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(order: Order): Promise<void> {
    const newOrder = await this.prisma.order.create({
      data: {
        id: order.id,
        amount: order.amount,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      },
    });
    signale.success(`Orden creada: ${newOrder.id}`);
  }
}
