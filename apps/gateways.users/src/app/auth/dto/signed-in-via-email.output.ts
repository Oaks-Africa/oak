import { Field, ObjectType } from '@nestjs/graphql';

import { UserOutput } from './user.output';

@ObjectType()
export class SignedInViaEmailOutput {
  @Field(() => UserOutput, { description: 'User signed in' })
  public user: UserOutput;
}
