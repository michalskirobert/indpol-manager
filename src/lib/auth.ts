import { getServerSession, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { DatabaseUser, UserProps } from "@/types/user";
import { getCollection } from "./mongodb";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const userDb = await getCollection("BackOffice", "users");

        const userFound = await userDb.findOne<DatabaseUser>({
          email: credentials?.email,
        });

        if (!userFound) return null;

        const passwordMatch = await bcrypt.compare(
          credentials!.password,
          userFound.password,
        );

        if (!passwordMatch) return null;

        await userDb.updateOne(
          { _id: userFound._id },
          { $set: { lastSeenAt: new Date() } },
        );

        const { password, ...userWithoutPassword } = userFound;

        return userWithoutPassword as UserProps;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24,
      },
    },
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        const { password, _id, ...rest } = user as DatabaseUser;
        console.log(user);
        token.id = _id.toString();

        Object.entries(rest).forEach(([key, value]) => {
          token[key] = value;
        });
      }

      if (trigger === "update" && session) {
        Object.entries(session).forEach(([key, value]) => {
          if (value !== undefined) {
            token[key] = value;
          }
        });
      }

      return token;
    },

    async session({ session, token }) {
      session.user = { ...token } as UserProps;
      return session;
    },
  },
};

const getSession = () => getServerSession(authOptions);

export { authOptions, getSession };
