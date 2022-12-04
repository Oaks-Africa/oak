import { Field, ObjectType } from '@nestjs/graphql';

import { UserOutput } from './user.output';

@ObjectType()
export class SignedUpViaEmailOutput {
  @Field(() => UserOutput, { description: 'User registered' })
  public user: UserOutput;
}
