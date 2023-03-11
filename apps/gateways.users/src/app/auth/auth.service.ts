import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
  UnauthorizedException
} from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { Field, ID, ObjectType } from "@nestjs/graphql";

import { lastValueFrom, map } from "rxjs";
import { google } from "googleapis";


import { USERS_SERVICE_NAME, UsersServiceClient } from "../../../../services.users/src/assets/proto/users";

import { CreateAuthInput } from "./dto/create-auth.input";
import { UpdateAuthInput } from "./dto/update-auth.input";
import { SignUpViaEmailInput } from "./dto/sign-up-via-email.input";
import { ValidateUserDto } from "./dto/validate-user.dto";
import { FindByEmailAndPasswordDto } from "../../../../services.users/src/app/users/dto/find-by-email-and-password.dto";
import { SignedUpViaEmailOutput } from "./dto/signed-up-via-email.output";
import { UserOutput } from "./dto/user.output";
import { ValidateGoogleUserDto } from "./dto/validate-google-user.dto";
import { GoogleIdTokenDto } from "./dto/google-id-token.dto";

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
            viaGoogle: false
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
          createdAt: new Date(res.createdAt),
          updatedAt: new Date(res.updatedAt)
        }
      };
    } catch (e) {
      this.logger.error("EXCEPTION CAUGHT: ", e);

      if (e instanceof HttpException) {
        throw e;
      }

      throw new BadRequestException(e.message);
    }
  }

  async validateUser(validateUserDto: ValidateUserDto) {
    return {
      id: "kdkd",
      email: "dkdjfd",
      viaGoogle: true
    };
  }

  async validateGoogleUser(validateGoogleUserDto: ValidateGoogleUserDto) {
    return {
      id: "kdkd",
      email: "dkdjfd",
      viaGoogle: true
    };
  }

  create(createAuthInput: CreateAuthInput) {
    return "This action adds a new auth";
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return {
      id: "kdkd",
      email: "dkdjfd"
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
            ...findByEmailAndPasswordDto
          })
          .pipe(
            map((data) => {
              if (data.status !== 200) {
                throw new UnauthorizedException("invalid user credentials");
              }

              return data.data;
            })
          )
      );

      return {
        ...res,
        lastSignIn: new Date(res.lastSignIn),
        createdAt: new Date(res.createdAt),
        updatedAt: new Date(res.updatedAt)
      };
    } catch (e) {
      this.logger.error("EXCEPTION CAUGHT: ", e);

      if (e instanceof HttpException) {
        throw e;
      }

      throw new BadRequestException(e.message);
    }
  }

  async validateUserViaGoogleIdToken(
    googleToken: GoogleIdTokenDto
  ): Promise<UserOutput> {
    try {
      const dd = new google.auth.OAuth2("", "");
      const res = await dd.verifyIdToken({ idToken: googleToken.idToken });
      const googleId = res.getUserId();
      const data = res.getPayload();
      const createUserData = {
        email: data.email,
        avatar: data.picture,
        name: {
          first: data.given_name,
          last: data.family_name
        }
      };
      return {
        ...res,
        lastSignIn: new Date(res.lastSignIn),
        createdAt: new Date(res.createdAt),
        updatedAt: new Date(res.updatedAt)
      };
    } catch (e) {
      this.logger.error("EXCEPTION CAUGHT: ", e);

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
