import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface User {
    accessToken: string;
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
  }

  interface Session {
    accessToken: string;
    user: User;
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Laravel Sanctum",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          if (!response.ok) {
            console.log(response.body);

            const errorData = await response.json();
            console.error("Login error:", errorData);
            throw new Error(errorData.message || "Login failed");
          }

          const data = await response.json();
          if (data?.user && data?.access_token) {
            console.log("data ", data);

            return {
              ...data.user,
              accessToken: data.access_token,
            };
          }
        } catch (error) {
          console.log("Error during authorization:", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log("JWT Callback:", { token, user });

      if (user) {
        return {
          ...token,
          id: user.id,
          accessToken: user.accessToken,
          name: user.name,
          email: user.email,
          user: user,
        }
      }

      console.log("JWT Callback:", { token, user });

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.user = token.user as User;
      return session;
    },
    async signIn({ user }) {
      console.log("user in signIn callback:", user);
      
      if (user) {
        console.log("User signed in:", user);
        return true;
      }
      return false;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login", 
  }
});

export { handler as GET, handler as POST };
