import { Field, ObjectType } from '@nestjs/graphql';

import { UserOutput } from './user.output';

@ObjectType()
export class GoogleAuthOutput {
  @Field(() => UserOutput, { description: 'User authenticated' })
  public user: UserOutput;
}
