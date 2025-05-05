import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
// import AppleProvider from "next-auth/providers/apple";
// import FacebookProvider from "next-auth/providers/facebook";
// import GoogleProvider from "next-auth/providers/google";
// import EmailProvider from "next-auth/providers/email";
import mongoose from "mongoose";
import User from "@/models/user";
import payment from "@/models/payment";
import connectDB from "@/db/connectDb";

export const authoptions = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: { params: { scope: "read:user user:email" } },
    }),

    // Google Provider
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET,
    // }),

    // // Facebook Provider
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET,
    // }),

    // // Apple Provider
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET,
    // }),

    // // Email Provider (Passwordless)
    // EmailProvider({
    //   server: process.env.MAIL_SERVER, // SMTP server settings
    //   from: process.env.EMAIL_FROM, // From address for passwordless emails
    // }),
  ],
  callbacks: {
    async signIn({ user, account, profile, credentials }) {
      if (account.provider === "github") {
        // Ensure email exists
        const email = user.email || profile.email;
        if (!email) {
          console.error("Email is undefined for the user.");
          return false; // Prevent sign-in if email is missing
        }
        // Connect to the database
        await connectDB();
        //check if the user already exists in the database
        let CurrentUser = await User.findOne({ email: email });
        if (!CurrentUser) {
          //create a new user in the database
          const newUser = new User({
            email: email,
            username: email.split("@")[0],
          });
          await newUser.save(); // Save the new user to the database
            CurrentUser = newUser;
        }
        // to sign in, as you dont have to permission to sign in error will come
        return true;
      }
      return false;
    },
    async session({ session, token, user }) {
      await connectDB();
      const dbUser = await User.findOne({ email: session.user.email });
      session.user.name = dbUser.username;
      return session;
    },
  },
});

export { authoptions as GET, authoptions as POST };
