import { Request, Response } from "express";
import { CreateTransferDTO, CustomError } from "../../domain";
import { TransferService } from "../services/transfer.service";

export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    console.log(error);
    return res.status(500).json({ message: "Something went very wrong! 🧨" });
  };

  makeTransfer = async (req: Request, res: Response) => {
    const [error, createTransferDto] = CreateTransferDTO.create(req.body);
    if (error) return res.status(422).json({ message: error });

    this.transferService
      .makeTransfer(createTransferDto!)
      .then((transfer) =>
        res.status(201).json({ message: "Money transfered succesfully" })
      )
      .catch((error) => this.handleError(error, res));
  };
}
