import { LoginWithGoogleGuard } from './login-with-google.guard';

describe('LoginWithGoogleGuard', () => {
  it('should be defined', () => {
    expect(new LoginWithGoogleGuard('googleAuthInput')).toBeDefined();
  });
});
