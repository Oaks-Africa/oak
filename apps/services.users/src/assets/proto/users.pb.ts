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
  password?: string | undefined;
  provider?: string | undefined;
  providerId?: string | undefined;
  name: Name | undefined;
  avatar?: string | undefined;
}

export interface Profile {
  name: Name | undefined;
}

export interface UserCreated {
  requestData: CreateUserReq | undefined;
  id: string;
  email: string;
  provider?: string | undefined;
  providerId?: string | undefined;
  profile: Profile | undefined;
  lastSignIn: string;
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
  provider?: string | undefined;
  providerId?: string | undefined;
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

export interface FindByEmailAndProviderReq {
  email: string;
  provider: string;
  providerId: string;
}

export interface FoundUserByEmailAndProvider {
  requestData: FindByEmailAndProviderReq | undefined;
  id: string;
  email: string;
  provider?: string | undefined;
  providerId?: string | undefined;
  lastSignIn: string;
  profile: Profile | undefined;
  createdAt: string;
  updatedAt: string;
}

export interface FindByEmailAndProviderRes {
  success: boolean;
  status: number;
  data: FoundUserByEmailAndProvider | undefined;
  message: string;
  error: string;
}

export interface FindByEmailReq {
  email: string;
}

export interface FoundUserByEmail {
  requestData: FindByEmailReq | undefined;
  id: string;
  email: string;
  provider?: string | undefined;
  providerId?: string | undefined;
  lastSignIn: string;
  profile: Profile | undefined;
  createdAt: string;
  updatedAt: string;
}

export interface FindByEmailRes {
  success: boolean;
  status: number;
  data: FoundUserByEmail | undefined;
  message: string;
  error: string;
}

export const USERS_PACKAGE_NAME = "users";

export interface UsersServiceClient {
  health(request: HealthReq): Observable<HealthRes>;

  createUser(request: CreateUserReq): Observable<CreateUserRes>;

  findByEmailAndPassword(request: FindByEmailAndPasswordReq): Observable<FindByEmailAndPasswordRes>;

  findByEmailAndProvider(request: FindByEmailAndProviderReq): Observable<FindByEmailAndProviderRes>;

  findByEmail(request: FindByEmailReq): Observable<FindByEmailRes>;
}

export interface UsersServiceController {
  health(request: HealthReq): Promise<HealthRes> | Observable<HealthRes> | HealthRes;

  createUser(request: CreateUserReq): Promise<CreateUserRes> | Observable<CreateUserRes> | CreateUserRes;

  findByEmailAndPassword(
    request: FindByEmailAndPasswordReq,
  ): Promise<FindByEmailAndPasswordRes> | Observable<FindByEmailAndPasswordRes> | FindByEmailAndPasswordRes;

  findByEmailAndProvider(
    request: FindByEmailAndProviderReq,
  ): Promise<FindByEmailAndProviderRes> | Observable<FindByEmailAndProviderRes> | FindByEmailAndProviderRes;

  findByEmail(request: FindByEmailReq): Promise<FindByEmailRes> | Observable<FindByEmailRes> | FindByEmailRes;
}

export function UsersServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "health",
      "createUser",
      "findByEmailAndPassword",
      "findByEmailAndProvider",
      "findByEmail",
    ];
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
