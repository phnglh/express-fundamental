import { RoleName } from "@/contants/role-name";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: string;
  @Column({ type: "enum", enum: RoleName, unique: true })
  name: RoleName;
  @Column({ nullable: true })
  description: string;
  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
