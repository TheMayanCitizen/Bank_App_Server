import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Status } from "./types/user.types";
import { bcryptAdapter } from "../../../config/bcrypt.adapter";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: 60,
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
    type: "varchar",
    length: 20,
  })
  accountNumber: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
  })
  password: string;

  @Column({
    nullable: false,
    type: "float",
  })
  amount: number;

  @Column({
    nullable: false,
    type: "enum",
    enum: Status,
    default: Status.ACTIVE,
  })
  status: Status;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  encryptPassword() {
    this.password = bcryptAdapter.hash(this.password);
  }
}
