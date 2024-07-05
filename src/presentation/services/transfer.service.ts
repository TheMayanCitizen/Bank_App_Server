import { CreateTransferDTO, CustomError } from "../../domain";
import { UserService } from "./user.service";
import { Transfer } from "../../data/postgres/models/transfer.model";

export class TransferService {
  constructor(private readonly userService: UserService) {}

  makeTransfer = async (createTransferDto: CreateTransferDTO) => {
    if (
      createTransferDto.senderAccountNumber ===
      createTransferDto.destinationAccountNumber
    )
      throw CustomError.badRequest("Invalid request");

    const senderAccountPromise = this.userService.findUserByAccountNumber(
      createTransferDto.senderAccountNumber
    );
    const receiverAccountPromise = this.userService.findUserByAccountNumber(
      createTransferDto.destinationAccountNumber
    );

    const [senderAccount, receiverAccount] = await Promise.all([
      senderAccountPromise,
      receiverAccountPromise,
    ]);

    if (senderAccount.amount < createTransferDto.amount)
      throw CustomError.badRequest("Not enough funds");

    const amountSenderAccount = senderAccount.amount - createTransferDto.amount;
    const amountReceiverAccount =
      receiverAccount.amount + createTransferDto.amount;

    const updateSenderPromise = this.userService.updateUserAccount(
      createTransferDto.senderAccountNumber,
      amountSenderAccount
    );
    const updateReceiverPromise = this.userService.updateUserAccount(
      createTransferDto.destinationAccountNumber,
      amountReceiverAccount
    );

    const createTransferPromise = this.createTransferHistory(
      createTransferDto.amount,
      senderAccount.id,
      receiverAccount.id
    );

    try {
      return await Promise.all([
        updateReceiverPromise,
        updateSenderPromise,
        createTransferPromise,
      ]);
    } catch (error) {
      throw CustomError.internalServer("Internal Server error");
    }
  };

  createTransferHistory = async (
    amount: number,
    senderUserId: number,
    receiverUserId: number
  ) => {
    const transfer = new Transfer();

    transfer.amount = amount;
    transfer.receiverUserId = receiverUserId;
    transfer.senderUserId = senderUserId;

    try {
      await transfer.save();

      return {
        ok: true,
      };
    } catch (error) {
      throw CustomError.internalServer("Internal Server error");
    }
  };
}
