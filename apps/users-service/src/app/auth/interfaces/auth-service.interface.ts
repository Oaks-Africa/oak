import { Observable } from 'rxjs';

import { AuthJwtDto } from '../dto/auth-jwt.dto';
import { AuthUserDto } from '../dto/auth-user.dto';
import { RegisterDto } from "../../../../../auth-service/src/app/auth/dtos/register.dto";

export interface AuthService {
  validateJwt(data: AuthJwtDto): Observable<AuthUserDto>;

  register(data: RegisterDto) : Observable<AuthUserDto>;
}
