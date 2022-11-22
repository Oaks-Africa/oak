import { Injectable } from '@nestjs/common';

import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { AuthService } from '../auth.service';

@ValidatorConstraint({ name: 'UniqueEmail', async: true })
@Injectable()
export class UniqueEmail implements ValidatorConstraintInterface {
  constructor(private readonly authService: AuthService) {}

  async validate(email: string) {
    try {
      return !(await this.authService.findUserByEmail(email));
    } catch (e) {
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `Email address already exists`;
  }
}
