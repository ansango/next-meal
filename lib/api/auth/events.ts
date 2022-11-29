import { type EventCallbacks } from "next-auth";

export const events: Partial<EventCallbacks> = {
  async signIn({}) {
    /* on successful sign in */
  },
  async signOut({}) {
    /* on signout */
  },
  async createUser({ user }) {
    /* user created */
  },
  async updateUser({}) {
    /* user updated - e.g. their email was verified */
  },
  async linkAccount({}) {
    /* account (e.g. Twitter) linked to a user */
  },
  async session({ session }) {
    /* session is active */
  },
};
