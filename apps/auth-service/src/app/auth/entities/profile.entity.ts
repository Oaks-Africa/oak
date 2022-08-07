import { ObjectType, Field, Int } from "@nestjs/graphql";

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn
} from "typeorm";

@ObjectType()
@Entity()
export class Profile {
  @Field(() => String, { description: "First Name of profile" })
  @Column()
  firstName?: string;

  @Field(() => String, { description: "Last Name of profile" })
  @Column()
  lastName?: string;

  @Field(() => String, { description: "Other Names of profile" })
  @Column()
  otherNames?: string;

  @Field(() => String, { description: "Phone number of profile" })
  @Column()
  phone?: string;

  @Field(() => String, { description: "Address number of profile" })
  @Column()
  address?: string;
}
