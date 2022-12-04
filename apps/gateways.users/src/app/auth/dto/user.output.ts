import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
class NameOutput {
  @Field({ description: 'First name of user signing up' })
  readonly first: string;

  @Field({ description: 'Last name of user signing up' })
  readonly last: string;

  @Field({ description: 'Other names of user signing up', nullable: true })
  readonly other?: string;
}

@ObjectType()
class ProfileOutput {
  @Field(() => NameOutput, { description: 'Name of profile' })
  public name: NameOutput;
}

@ObjectType()
export class UserOutput {
  @Field(() => ID, { description: 'This is the ID of the user' })
  readonly id: string;

  @Field({ description: 'Email address of user' })
  readonly email: string;

  @Field({ description: 'Datetime of last sign in', nullable: true })
  readonly lastSignIn?: Date;

  @Field(() => ProfileOutput, { description: 'User profile' })
  public profile: ProfileOutput;

  @Field({ description: 'Datetime user was created' })
  readonly createdAt: Date;

  @Field({ description: 'Datetime user was updated' })
  readonly updatedAt: Date;
}
