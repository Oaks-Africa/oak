import { ObjectType, Field, Int } from "@nestjs/graphql";

import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn
} from "typeorm";

import * as bcrypt from "bcrypt";

import { Profile } from "./profile.entity";


@ObjectType()
export class User {
  @Field(() => String, { description: "User ID" })
  @ObjectIdColumn()
  id: ObjectID;

  @Field(() => String, { description: "Email address used for authentication" })
  @Column()
  email?: string;

  @Column()
  password: string;

  @Field(() => String, { description: "The last login date of the user" })
  @Column()
  lastLogin: Date;

  @Field(() => String, { description: "Display avatar url of the user" })
  @Column()
  avatar?: string;

  @Field(() => Profile, { description: "Profile details of the user" })
  @Column((type) => Profile)
  profile?: Profile;

  @Field(() => String, { description: "Date user was created" })
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String, { description: "Date user was updated" })
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
