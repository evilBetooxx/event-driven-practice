export class Order {
  constructor(
    public id: string,
    public amount: number,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}
