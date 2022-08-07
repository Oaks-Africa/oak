import { Field, ObjectType } from "@nestjs/graphql";

import { User } from "../entities/user.entity";

import { AuthOutput } from "./auth.output";

@ObjectType()
export class RegisteredOutput {
  @Field(() => User, { description: "User registered" })
  user: User;

  @Field(() => AuthOutput, { description: "Auth options" })
  auth: AuthOutput;
}
