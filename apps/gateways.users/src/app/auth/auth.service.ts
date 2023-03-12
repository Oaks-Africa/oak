import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Field, ID, ObjectType } from '@nestjs/graphql';

import { lastValueFrom, map } from 'rxjs';
import { google } from 'googleapis';

import { CreateAuthInput } from './dto/create-auth.input';
import { UpdateAuthInput } from './dto/update-auth.input';
import { SignUpViaEmailInput } from './dto/sign-up-via-email.input';
import { ValidateUserDto } from './dto/validate-user.dto';
import { FindByEmailAndPasswordDto } from '../../../../services.users/src/app/users/dto/find-by-email-and-password.dto';
import { SignedUpViaEmailOutput } from './dto/signed-up-via-email.output';
import { UserOutput } from './dto/user.output';
import { ValidateGoogleUserDto } from './dto/validate-google-user.dto';
import { ProviderTokenDto } from './dto/provider-token.dto';
import {
  USERS_SERVICE_NAME,
  UsersServiceClient,
} from '@oak/services.users/proto';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService implements OnModuleInit {
  private readonly logger: Logger;

  private usersClient: UsersServiceClient;

  constructor(
    @Inject(USERS_SERVICE_NAME)
    private readonly client: ClientGrpc
  ) {
    this.logger = new Logger(AuthService.name);
  }

  onModuleInit() {
    this.usersClient =
      this.client.getService<UsersServiceClient>(USERS_SERVICE_NAME);
  }

  async signUpViaEmail(
    signUpViaEmailInput: SignUpViaEmailInput
  ): Promise<SignedUpViaEmailOutput> {
    try {
      const res = await lastValueFrom(
        this.usersClient
          .createUser({
            ...signUpViaEmailInput,
          })
          .pipe(
            map((data) => {
              if (data.status !== 200) {
                throw new BadRequestException(data.message);
              }

              return data.data;
            })
          )
      );

      return {
        user: {
          ...res,
          lastSignIn: res.lastSignIn ? new Date(res.lastSignIn) : null,
          createdAt: new Date(res.createdAt),
          updatedAt: new Date(res.updatedAt),
        },
      };
    } catch (e) {
      this.logger.error('EXCEPTION CAUGHT: ', e);

      if (e instanceof HttpException) {
        throw e;
      }

      throw new BadRequestException(e.message);
    }
  }

  async validateUser(validateUserDto: ValidateUserDto) {
    return {
      id: 'kdkd',
      email: 'dkdjfd',
      viaGoogle: true,
    };
  }

  async validateGoogleUser(validateGoogleUserDto: ValidateGoogleUserDto) {
    return {
      id: 'kdkd',
      email: 'dkdjfd',
      viaGoogle: true,
    };
  }

  create(createAuthInput: CreateAuthInput) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return {
      id: 'kdkd',
      email: 'dkdjfd',
    } as Fd;
    // return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthInput: UpdateAuthInput) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  async validateUserByEmailAndPassword(
    findByEmailAndPasswordDto: FindByEmailAndPasswordDto
  ): Promise<UserOutput> {
    try {
      const res = await lastValueFrom(
        this.usersClient
          .findByEmailAndPassword({
            ...findByEmailAndPasswordDto,
          })
          .pipe(
            map((data) => {
              if (data.status !== 200) {
                throw new UnauthorizedException('invalid user credentials');
              }

              return data.data;
            })
          )
      );

      return {
        ...res,
        lastSignIn: new Date(res.lastSignIn),
        createdAt: new Date(res.createdAt),
        updatedAt: new Date(res.updatedAt),
      };
    } catch (e) {
      this.logger.error('EXCEPTION CAUGHT: ', e);

      if (e instanceof HttpException) {
        throw e;
      }

      throw new BadRequestException(e.message);
    }
  }

  async validateUserViaProvider(
    providerToken: ProviderTokenDto
  ): Promise<UserOutput> {
    try {
      // Do Google verification and initializations
      const googleClient = new google.auth.OAuth2(
        environment.google.client.id,
        environment.google.client.secret
      );
      const googleVerificationRes = await googleClient.verifyIdToken({
        idToken: providerToken.idToken,
      });
      const providerId = googleVerificationRes.getUserId();
      const { email } = googleVerificationRes.getPayload();

      // Verify user exists in our service
      const providerRes = await lastValueFrom(
        this.usersClient
          .findByEmailAndProvider({
            email,
            providerId,
            provider: 'GOOGLE',
          })
          .pipe(
            map((data) => {
              if (data.status !== 200) {
                return null;
              }

              return data.data;
            })
          )
      );

      if (providerRes) {
        return {
          ...providerRes,
          lastSignIn: new Date(providerRes.lastSignIn),
          createdAt: new Date(providerRes.createdAt),
          updatedAt: new Date(providerRes.updatedAt),
        };
      }

      // Verify user email exists in our service
      const emailRes = await lastValueFrom(
        this.usersClient
          .findByEmail({
            email,
          })
          .pipe(
            map((data) => {
              if (data.status !== 200) {
                return null;
              }

              return data.data;
            })
          )
      );

      if (emailRes) {
        throw new UnauthorizedException(
          'unable to sign in with this google account'
        );
      }

      const { picture, given_name, family_name } =
        googleVerificationRes.getPayload();

      const userCreatedRes = await lastValueFrom(
        this.usersClient
          .createUser({
            email,
            avatar: picture,
            name: {
              first: given_name,
              last: family_name,
            },
            providerId,
            provider: 'GOOGLE',
          })
          .pipe(
            map((data) => {
              if (data.status !== 200) {
                throw new BadRequestException(data.message);
              }

              return data.data;
            })
          )
      );
      return {
        ...userCreatedRes,
        lastSignIn: new Date(userCreatedRes.lastSignIn),
        createdAt: new Date(userCreatedRes.createdAt),
        updatedAt: new Date(userCreatedRes.updatedAt),
      };
    } catch (e) {
      this.logger.error('EXCEPTION CAUGHT: ', e);

      if (e instanceof HttpException) {
        throw e;
      }

      throw new BadRequestException(e.message);
    }
  }
}

@ObjectType()
export class Fd {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  email: string;
}
