
import { type Provider } from "next-auth/providers";
import Google from "next-auth/providers/google";

const GoogleProvider = Google({
  clientId: process.env.GOOGLE_CLIENT_ID || "",
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  authorization: {
    params: {
      prompt: "consent",
      access_type: "offline",
      response_type: "code",
    },
  },
});

export const providers: Provider[] = [GoogleProvider];
