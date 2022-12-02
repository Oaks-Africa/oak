import { Embeddable, Property } from '@mikro-orm/core';

@Embeddable()
export class Name {
  @Property()
  first!: string;

  @Property()
  last!: string;

  @Property({ nullable: true })
  other?: string;

}
