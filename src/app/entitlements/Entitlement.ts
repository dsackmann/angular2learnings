export class Entitlement {
  constructor(
    public name?: string,
    public transactionLimit?: number,
    public dailyLimit?: number
  ) {}
}
