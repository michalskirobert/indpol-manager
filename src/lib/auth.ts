import { connectDB } from "./mongodb";
import User from "@/app/api/models/User.model";
import { getServerSession, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { UserProps } from "@/types/user";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
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
        return userFound;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        const u = user;
        token.id = u._id;
        token.name = u.name;
        token.email = u.email;
      }

      if (trigger === "update") {
        if (session?.name) token.name = session.name;
        if (session?.email) token.email = session.email;
        if (session?.address) token.address = session.address;
        if (session?.phone) token.phone = session.phone;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user = token.user as UserProps;
      }

      return session;
    },
  },
};

const getSession = () => getServerSession(authOptions);

export { authOptions, getSession };
