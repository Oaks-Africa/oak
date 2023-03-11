import { Field, InputType } from "@nestjs/graphql";

import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class GoogleAuthInput {
  @Field({ description: "Email address to create account with" })
  @IsNotEmpty()
  @IsString()
  readonly token: string;
}
