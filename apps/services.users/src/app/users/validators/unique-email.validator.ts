import { Injectable, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { UsersService } from '../users.service';

@ValidatorConstraint({ name: 'UniqueEmail', async: true })
@Injectable()
export class UniqueEmail implements ValidatorConstraintInterface, OnModuleInit {
  private usersService: UsersService;
  constructor(private moduleRef: ModuleRef) {}

  onModuleInit() {
    this.usersService = this.moduleRef.get(UsersService);
  }

  async validate(email: string): Promise<boolean> {
    try {
      return !(await this.usersService.findByEmail({ email }));
    } catch (e) {
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `email already exists`;
  }
}
