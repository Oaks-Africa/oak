import { InputType, Field } from '@nestjs/graphql';

import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

@InputType()
export class SignInViaEmailInput {
  @Field({ description: 'Email address to sign in with' })
  @IsNotEmpty()
  @MaxLength(100)
  @IsEmail()
  readonly email: string;

  @Field({ description: 'Password to sign in with' })
  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @Field({ description: 'Password to sign in with' })
  readonly token: string;
}
