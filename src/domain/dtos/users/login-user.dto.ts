export class LoginUserDTO {
  private constructor(
    public readonly accountNumber: string,
    public readonly password: string
  ) {}

  static create(object: { [key: string]: any }): [string?, LoginUserDTO?] {
    const { accountNumber, password } = object;

    if (!accountNumber) return ["accountNumber is missing"];
    if (!password) return ["Password is missing"];

    return [undefined, new LoginUserDTO(accountNumber, password)];
  }
}
