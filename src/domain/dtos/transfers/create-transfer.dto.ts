export class CreateTransferDTO {
  private constructor(
    public readonly amount: number,
    public readonly senderAccountNumber: string,
    public readonly destinationAccountNumber: string
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateTransferDTO?] {
    const { amount, senderAccountNumber, destinationAccountNumber } = object;

    if (!amount) return ["Amount is required"];
    if (!senderAccountNumber) return ["Sender account is required"];
    if (!destinationAccountNumber) return ["Destination account is required"];

    return [
      undefined,
      new CreateTransferDTO(
        amount,
        senderAccountNumber,
        destinationAccountNumber
      ),
    ];
  }
}
