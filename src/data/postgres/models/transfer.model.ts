import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Transfer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    type: "float",
  })
  amount: number;

  @Column({
    nullable: false,
    type: "int",
  })
  senderUserId: number;

  @Column({
    nullable: false,
    type: "int",
  })
  receiverUserId: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
