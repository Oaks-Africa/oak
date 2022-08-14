import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class RegisterInput {
  @Field(() => String, { description: "Email address to register with" })
  public readonly email: string;

  @Field(() => String, { description: "Password to register with" })
  public readonly password: string;

  @Field(() => String, { description: "Confirm password" })
  public readonly confirmPassword: string;
}
