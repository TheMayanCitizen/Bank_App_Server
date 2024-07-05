import { Request, Response } from "express";
import { CreateUserDTO, CustomError, LoginUserDTO } from "../../domain";
import { UserService } from "../services/user.service";

export class UserController {
  constructor(private readonly userService: UserService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    console.log(error);
    return res.status(500).json({ message: "Something went very wrong! 🧨" });
  };

  signup = async (req: Request, res: Response) => {
    const [error, createUserDto] = CreateUserDTO.create(req.body);
    if (error) return res.status(422).json({ message: error });

    this.userService
      .signup(createUserDto!)
      .then((accountNumber) => res.status(201).json(accountNumber))
      .catch((error) => this.handleError(error, res));
  };

  login = async (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDTO.create(req.body);
    if (error) return res.status(422).json({ message: error });

    this.userService
      .login(loginUserDto!)
      .then((user) => res.status(201).json(user))
      .catch((error) => this.handleError(error, res));
  };
}
