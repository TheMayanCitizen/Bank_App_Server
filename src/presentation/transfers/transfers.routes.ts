import { Router } from "express";
import { UserService } from "../services/user.service";
import { TransferService } from "../services/transfer.service";
import { TransferController } from "./transfer.controllers";

export class TransferRoutes {
  static get routes(): Router {
    const router = Router();

    const userService = new UserService();
    const transferService = new TransferService(userService);
    const controller = new TransferController(transferService);

    router.post("/", controller.makeTransfer);

    return router;
  }
}
