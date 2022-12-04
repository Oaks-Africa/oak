import { GqlCookieAuthGuard } from './gql-cookie-auth.guard';

describe('GqlCookieAuthGuard', () => {
  it('should be defined', () => {
    expect(new GqlCookieAuthGuard()).toBeDefined();
  });
});
