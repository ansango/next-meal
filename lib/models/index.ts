/**
 * Model User
 *
 */
export type User = {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  roles: string[];
  avatar: string | null;
};
