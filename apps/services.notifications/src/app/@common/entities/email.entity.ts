import { Entity, Enum, Property } from '@mikro-orm/core';

import { Status } from '../enums/status.enum';

import { BaseEntity } from './base.entity';

@Entity()
export class Email extends BaseEntity {
  @Property()
  recipient!: string;

  @Property()
  sender!: string;

  @Property()
  description!: string;

  @Property()
  request!: any;

  @Property()
  response!: any;

  @Enum(() => Status)
  status: Status = Status.PENDING;
}
