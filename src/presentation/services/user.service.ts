import { bcryptAdapter } from "../../config/bcrypt.adapter";
import { generateAccountNumber } from "../../config/genAccNumber";
import { JwtAdapter } from "../../config/jwt.adapter";
import { Status } from "../../data/postgres/models/types/user.types";
import { User } from "../../data/postgres/models/user.model";
import { CreateUserDTO, CustomError, LoginUserDTO } from "../../domain";

export class UserService {
  constructor() {}

  signup = async (createUserDto: CreateUserDTO) => {
    const accountNumber = generateAccountNumber();

    const user = new User();

    user.name = createUserDto.name;
    user.accountNumber = accountNumber.toString();
    user.password = createUserDto.password;
    user.amount = 1000;

    try {
      const userCreated = await user.save();

      return {
        accountNumber: userCreated.accountNumber,
        name: userCreated.name,
        amount: userCreated.amount,
      };
    } catch (error) {
      throw CustomError.internalServer("Internal Server error");
    }
  };

  login = async (loginUserDto: LoginUserDTO) => {
    const user = await User.findOne({
      where: {
        accountNumber: loginUserDto.accountNumber,
        status: Status.ACTIVE,
      },
    });

    if (!user) throw CustomError.unAuthorized("Invalid credentials");

    const isMatching = bcryptAdapter.compare(
      loginUserDto.password,
      user.password
    );
    if (!isMatching) throw CustomError.unAuthorized("Invalid credentials");

    const token = JwtAdapter.generateToken({ id: user.id });
    if (!token) throw CustomError.internalServer("Internal Server error");

    return {
      token,
      user: {
        accountNumber: user.accountNumber,
        name: user.name,
        amount: user.amount,
      },
    };
  };

  findUserByAccountNumber = async (accountNumber: string) => {
    const user = await User.findOne({
      where: {
        accountNumber,
        status: Status.ACTIVE,
      },
    });

    if (!user) throw CustomError.notFound("User does not exist");

    return user;
  };

  updateUserAccount = async (accountNUmber: string, amount: number) => {
    const user = await this.findUserByAccountNumber(accountNUmber);

    user.amount = amount;

    try {
      await user.save();

      return {
        ok: true,
      };
    } catch (error) {
      throw CustomError.internalServer("Internal Server error");
    }
  };
}
