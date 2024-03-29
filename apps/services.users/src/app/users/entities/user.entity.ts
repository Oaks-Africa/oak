import {
  BeforeCreate,
  Embedded,
  Entity,
  Property,
  Unique,
} from '@mikro-orm/core';

import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';

import { BaseEntity } from '../../@common/entities/base.entity';
import { Profile } from './profile.entity';

@Entity()
export class User extends BaseEntity {
  @Property()
  @Unique()
  email!: string;

  @Property({ nullable: true })
  providerId?: string;

  @Property({ nullable: true })
  provider?: string;

  @Property({ nullable: true })
  @Exclude()
  password?: string;

  @Embedded(() => Profile, { object: true })
  profile: Profile;

  @Property({ nullable: true })
  lastSignIn?: Date;

  @BeforeCreate()
  async hashPassword() {
    if (this.password) {
      const salt = await bcrypt.genSalt();

      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
