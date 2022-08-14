import { ObjectType, Field, ID } from "@nestjs/graphql";

import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn
} from "typeorm";

import * as bcrypt from "bcrypt";
import { Exclude } from "class-transformer";

import { Profile } from "./profile.entity";

@ObjectType()
@Entity()
export class User {
  @Field(() => ID, { description: "User ID" })
  @ObjectIdColumn()
  id: ObjectID;

  @Field(() => String, { description: "Email address used for authentication" })
  @Column({ unique: true })
  email?: string;

  @Column()
  @Exclude()
  password: string;

  @Field(() => Date, { description: "The last login date of the user" })
  @Column()
  lastLogin: Date;

  @Field(() => String, { description: "Display avatar url of the user" })
  @Column()
  avatar?: string;

  @Field(() => Profile, { description: "Profile details of the user" })
  @Column((type) => Profile)
  profile?: Profile;

  @Field(() => Date, { description: "Date user was created" })
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date, { description: "Date user was updated" })
  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      const salt = await bcrypt.genSalt();

      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
