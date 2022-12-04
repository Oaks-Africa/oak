/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "users";

export interface HealthReq {
}

export interface HealthRes {
  status: number;
}

export interface Name {
  first: string;
  last: string;
  other?: string | undefined;
}

export interface CreateUserReq {
  email: string;
  password: string;
  viaGoogle: boolean;
  name: Name | undefined;
}

export interface Profile {
  name: Name | undefined;
}

export interface UserCreated {
  requestData: CreateUserReq | undefined;
  id: string;
  email: string;
  viaGoogle: boolean;
  profile: Profile | undefined;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserRes {
  success: boolean;
  status: number;
  data: UserCreated | undefined;
  message: string;
  error: string;
}

export interface FindByEmailAndPasswordReq {
  email: string;
  password: string;
}

export interface FoundUserByEmailAndPassword {
  requestData: FindByEmailAndPasswordReq | undefined;
  id: string;
  email: string;
  viaGoogle: boolean;
  lastSignIn: string;
  profile: Profile | undefined;
  createdAt: string;
  updatedAt: string;
}

export interface FindByEmailAndPasswordRes {
  success: boolean;
  status: number;
  data: FoundUserByEmailAndPassword | undefined;
  message: string;
  error: string;
}

export const USERS_PACKAGE_NAME = "users";

export interface UsersServiceClient {
  health(request: HealthReq): Observable<HealthRes>;

  createUser(request: CreateUserReq): Observable<CreateUserRes>;

  findByEmailAndPassword(request: FindByEmailAndPasswordReq): Observable<FindByEmailAndPasswordRes>;
}

export interface UsersServiceController {
  health(request: HealthReq): Promise<HealthRes> | Observable<HealthRes> | HealthRes;

  createUser(request: CreateUserReq): Promise<CreateUserRes> | Observable<CreateUserRes> | CreateUserRes;

  findByEmailAndPassword(
    request: FindByEmailAndPasswordReq,
  ): Promise<FindByEmailAndPasswordRes> | Observable<FindByEmailAndPasswordRes> | FindByEmailAndPasswordRes;
}

export function UsersServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["health", "createUser", "findByEmailAndPassword"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UsersService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UsersService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USERS_SERVICE_NAME = "UsersService";
