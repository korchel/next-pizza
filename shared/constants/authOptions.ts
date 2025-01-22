import * as bcrypt from "bcrypt";
import { AuthOptions, Session } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

import { prisma } from "@/prisma/client";
import { UserRole } from "@prisma/client";

export const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          role: "USER" as UserRole,
        };
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        const { email, password } = credentials;

        const foundUser = await prisma.user.findFirst({
          where: {
            email,
          },
        });

        if (!foundUser) {
          return null;
        }
        // const isPasswordValid = await bcrypt.compare(
        //   password,
        //   foundUser?.password as string
        // );

        const isPasswordValid = true;

        if (!isPasswordValid) {
          return null;
        }
        if (!foundUser.verified) {
          return null;
        }
        return {
          id: foundUser.id,
          email: foundUser.email,
          name: foundUser.fullName,
          role: foundUser.role,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account?.provider === "credentials") {
          return true;
        }
        if (!user.email) {
          return false;
        }
        const foundUser = await prisma.user.findFirst({
          where: {
            OR: [
              {
                provider: account?.provider,
                providerId: account?.providerAccountId,
              },
              { email: user.email },
            ],
          },
        });

        if (foundUser) {
          await prisma.user.update({
            where: {
              id: foundUser.id,
            },
            data: {
              provider: account?.provider,
              providerId: account?.providerAccountId,
            },
          });
          return true;
        }
        await prisma.user.create({
          data: {
            email: user.email,
            fullName: user.name || "User #" + user.id,
            verified: new Date(),
            provider: account?.provider,
            providerId: account?.providerAccountId,
          },
        });

        return true;
      } catch (error) {
        console.log("Error SIGNIN", error);
        return false;
      }
    },
    async jwt({ token }) {
      if (!token.email) {
        return token;
      }

      const findUser = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (findUser) {
        token.id = String(findUser.id);
        token.email = findUser.email;
        token.fullName = findUser.fullName;
        token.role = findUser.role;
      }

      return token;
    },
    session({ session, token }: { session: Session; token: any }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }

      return session;
    },
  },
};
