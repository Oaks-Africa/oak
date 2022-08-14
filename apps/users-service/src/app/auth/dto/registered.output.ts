import { Field, ObjectType } from "@nestjs/graphql";

import { User } from "../entities/user.entity";

import { AuthOutput } from "./auth.output";

@ObjectType()
export class RegisteredOutput {
  @Field(() => User, { description: "User registered" })
  public user: User;

  @Field(() => AuthOutput, { description: "Auth options" })
  public auth: AuthOutput;
}
