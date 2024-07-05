import { Router } from "express";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/v1/users", () => {});
    router.use("/api/v1/transfers", () => {});

    return router;
  }
}
