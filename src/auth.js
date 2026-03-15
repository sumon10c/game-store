import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { dbConnect, collection } from "@/mongodb/dbConnect";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const { email, password } = credentials;

        // ১. ডাটাবেস কানেক্ট করা
        const usersCollection = await dbConnect(collection.USERS);
        
        // ২. ইউজার খুঁজে বের করা
        const user = await usersCollection.findOne({ email });

        if (!user) {
          throw new Error("No user found with this email");
        }

        // ৩. পাসওয়ার্ড চেক করা
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
          throw new Error("Invalid password");
        }

        // ৪. ইউজার অবজেক্ট রিটার্ন করা (এটি সেশনে যাবে)
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          photo: user.photo, // আপনার ডাটাবেসের ফিল্ডের নাম অনুযায়ী
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.photo = user.photo;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.image = token.photo; // এই লাইনটিই ন্যাভবারে ছবি দেখাবে
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
});