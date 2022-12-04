interface Name {
  first: string;
  last: string;
  other?: string;
}

interface Profile {
  name: Name;
}

interface User {
  id: string;
  email: string;
  viaGoogle: string;
  lastSignIn?: string;
  profile: Profile;
  createdAt: string;
  updatedAt: string;
}

export interface Auth {
  user: User;
}

export function createAuth(params: Partial<Auth>) {
  return {} as Auth;
}
