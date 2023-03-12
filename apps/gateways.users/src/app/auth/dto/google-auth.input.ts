import { Field, InputType } from "@nestjs/graphql";

import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class GoogleAuthInput {
  @Field({ description: "ID Token from google authentication provider" })
  @IsNotEmpty()
  @IsString()
  readonly idToken: string;
}
