import { BeforeCreate, Entity, Property, Unique } from '@mikro-orm/core';

import * as bcrypt from 'bcrypt';

import { BaseEntity } from '../../@common/entities/base.entity';

@Entity()
export class User extends BaseEntity {
  @Property()
  @Unique()
  email!: string;

  @Property({ nullable: true })
  password?: string;

  @BeforeCreate()
  async hashPassword() {
    if (this.password) {
      const salt = await bcrypt.genSalt();

      this.password = await bcrypt.hash(this.password, salt);
    }
  }
}
