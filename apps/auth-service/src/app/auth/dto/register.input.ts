import { InputType, Int, Field } from "@nestjs/graphql";

@InputType()
export class RegisterInput {
  @Field(() => String, { description: "Email address to register with" })
  email: string;

  @Field(() => String, { description: "Password to register with" })
  password: string;

  @Field(() => String, { description: "Confirm password" })
  confirmPassword: string;
}
