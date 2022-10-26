import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { Properties } from "./properties.entity";
import { User } from "./user.entity";

@Entity("schedules_users_properties")
export class schedules {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn({ type: "date" })
  date: string;

  @CreateDateColumn({ type: "time" })
  hour: string;

  @ManyToOne(() => Properties)
  properties: Properties;

  @ManyToOne(() => User, { eager: true })
  user: User;
}
