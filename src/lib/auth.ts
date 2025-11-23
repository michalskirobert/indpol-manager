import { getServerSession, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { UserProps } from "@/types/user";
import { connectDB } from "../types/mongodb";
import type { Document } from "mongoose";
import User from "@/app/api/models/User.model";

type MongooseUser = Document & UserProps;

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
        await connectDB("BackOffice");

        const userFound = await User.findOne({
          email: credentials?.email,
        }).select("+password");

        if (!userFound) throw new Error("Invalid Email");

        const passwordMatch = await bcrypt.compare(
          credentials!.password,
          userFound.password,
        );

        if (!passwordMatch) throw new Error("Invalid Password");

        await User.updateOne({ _id: userFound._id }, { lastLogin: new Date() });

        return userFound;
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
        const u = user as MongooseUser;
        const obj = u.toObject();
        const { password, _id, ...rest } = obj;
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
