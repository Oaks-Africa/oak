import { Embeddable, Embedded } from '@mikro-orm/core';

import { Name } from './name.entity';

@Embeddable()
export class Profile {
  @Embedded(() => Name)
  name!: Name;
}
