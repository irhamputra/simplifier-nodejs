interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  token: string;
}

type NewUser = Omit<User, 'token'>;
type UserLogin = Pick<User, 'email' | 'password'>;

export type { User, NewUser, UserLogin };
