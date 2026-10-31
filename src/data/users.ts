export type User = {
  username: string;
  password: string;
};

export const users = {
  standard: { username: 'standard_user', password: 'secret_sauce' },
  lockedOut: { username: 'locked_out_user', password: 'secret_sauce' },
  invalidPassword: { username: 'standard_user', password: 'invalid_password' },
} as const satisfies Record<string, User>;
