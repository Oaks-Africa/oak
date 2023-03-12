import { LoginWithCredentialsGuard } from './login-with-credentials.guard';

describe('LoginWithCredentialsGuard', () => {
  it('should be defined', () => {
    expect(new LoginWithCredentialsGuard("signInViaEmailInput")).toBeDefined();
  });
});
