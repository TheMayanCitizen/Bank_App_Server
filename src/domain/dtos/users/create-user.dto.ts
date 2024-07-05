export class CreateUserDTO {
  private constructor(
    public readonly name: string,
    public readonly password: string
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateUserDTO?] {
    const { name, password } = object;

    if (!name) return ["Name is missing"];
    if (!password) return ["Password is missing"];

    return [undefined, new CreateUserDTO(name, password)];
  }
}
