import { Entity } from '@mikro-orm/core';

import { BaseEntity } from './@common/entities/base.entity';

@Entity()
export class Example extends BaseEntity {}
