import { Router } from "express";
import { UserService } from "../services/user.service";
import { UserController } from "./users.controllers";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const userService = new UserService();
    const controller = new UserController(userService);

    router.post("/signup", controller.signup);
    router.post("/login", controller.login);

    return router;
  }
}
