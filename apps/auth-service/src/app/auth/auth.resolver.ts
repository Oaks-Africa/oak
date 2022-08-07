import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";

import { User } from "./entities/user.entity";

import { UpdateAuthInput } from "./dto/update-auth.input";
import { RegisteredOutput } from "./dto/registered.output";
import { RegisterInput } from "./dto/register.input";

import { AuthService } from "./auth.service";

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {
  }

  @Mutation(() => RegisteredOutput)
  createAuth(@Args("registerInput") registerInput: RegisterInput) {
    return this.authService.register(registerInput);
  }

  @Query(() => [User], { name: "auth" })
  findAll() {
    return this.authService.findAll();
  }

  @Query(() => User, { name: "auth" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.authService.findOne(id);
  }

  @Mutation(() => User)
  updateAuth(@Args("updateAuthInput") updateAuthInput: UpdateAuthInput) {
    return this.authService.update(updateAuthInput.id, updateAuthInput);
  }

  @Mutation(() => User)
  removeAuth(@Args("id", { type: () => Int }) id: number) {
    return this.authService.remove(id);
  }
}
