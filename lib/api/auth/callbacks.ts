import { type CallbacksOptions } from "next-auth";

export const callbacks: Partial<CallbacksOptions> = {
  async signIn({ user, account, profile, email, credentials }) {
    if (user && user.email === process.env.PRIVATE_EMAIL_USER) {
      return true;
    }
    return false;
  },
  async redirect({ url, baseUrl }) {
    const isSignInPage = url.includes("signin");
    if (isSignInPage) {
      return `${baseUrl}/dashboard`;
    }
    return "/";
  },
  async session({
    session,
    token,
    user,
  }: {
    session: any;
    token: any;
    user: any;
  }) {
    session.user.roles = user.roles;
    session.user.id = user.id;
    return session;
  },
};
