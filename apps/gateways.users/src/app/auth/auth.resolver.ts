import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { CurrentUser } from './decorators/current-user.decorator';

import { Auth } from './entities/auth.entity';

import { CreateAuthInput } from './dto/create-auth.input';
import { UpdateAuthInput } from './dto/update-auth.input';
import { SignUpViaEmailInput } from './dto/sign-up-via-email.input';
import { SignInViaEmailInput } from './dto/sign-in-via-email.input';
import { SignedUpViaEmailOutput } from './dto/signed-up-via-email.output';
import { SignedInViaEmailOutput } from './dto/signed-in-via-email.output';
import { UserOutput } from './dto/user.output';

import { AuthService, Fd } from './auth.service';

import { GqlCookieAuthGuard } from '../@common/guards/gql-cookie-auth.guard';
import { LoginWithCredentialsGuard } from './guards/login-with-credentials.guard';
import { GoogleAuthInput } from "./dto/google-auth.input";
import { LoginWithGoogleGuard } from "./guards/login-with-google.guard";
import { GoogleAuthOutput } from "./dto/google-auth.output";

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth)
  createAuth(@Args('createAuthInput') createAuthInput: CreateAuthInput) {
    return this.authService.create(createAuthInput);
  }

  @Mutation(() => SignedUpViaEmailOutput, { name: 'signUpViaEmail' })
  signUpViaEmail(
    @Args('signUpViaEmailInput') signUpViaEmailInput: SignUpViaEmailInput
  ) {
    return this.authService.signUpViaEmail(signUpViaEmailInput);
  }

  @Mutation(() => SignedInViaEmailOutput, { name: 'signInViaEmail' })
  @UseGuards(new LoginWithCredentialsGuard('signInViaEmailInput'))
  signInViaEmail(
    @Args('signInViaEmailInput') signInViaEmailInput: SignInViaEmailInput,
    @CurrentUser() user: UserOutput
  ) {
    return {
      user,
    };
  }

  @Mutation(() => GoogleAuthOutput, { name: 'googleAuth' })
  @UseGuards(new LoginWithGoogleGuard('googleAuthInput'))
  googleAuth(
    @Args('googleAuthInput') googleAuthInput: GoogleAuthInput,
    @CurrentUser() user: UserOutput
  ) {
    return {
      user,
    };
  }

  @Query(() => [Auth], { name: 'auth' })
  findAll() {
    return this.authService.findAll();
  }

  @UseGuards(GqlCookieAuthGuard)
  @Query(() => Fd, { name: 'authF' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.authService.findOne(id);
  }

  @Mutation(() => Auth)
  updateAuth(@Args('updateAuthInput') updateAuthInput: UpdateAuthInput) {
    return this.authService.update(updateAuthInput.id, updateAuthInput);
  }

  @Mutation(() => Auth)
  removeAuth(@Args('id', { type: () => Int }) id: number) {
    return this.authService.remove(id);
  }
}
