import { hashSync } from "bcryptjs";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 20 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  isAdm: boolean;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  hashPassword = () => {
    this.password = hashSync(this.password, 10);
  };
}
