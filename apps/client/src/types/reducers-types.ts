import { User } from './user-type';

export type AuthState = {
  loginModal: boolean;
  registerModal: boolean;
  user: User | null;
};
