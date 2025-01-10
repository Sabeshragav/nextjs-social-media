import userModel from "@models/userModel";
import connectMongo from "@utils/connectDB";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      // console.log("before", session);

      const sessionUser = await userModel.findOne({
        email: session.user.email,
      });
      session.user.id = sessionUser._id.toString();
      // console.log("after", session);
      return session;
    },
    async signIn({ profile }) {
      try {
        // console.log(profile);

        await connectMongo();

        // check if user already exists
        const userExists = await userModel.findOne({ email: profile.email });

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          await userModel.create({
            email: profile.email,
            username: profile.name,
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.error("Error checking if user exists: ", error.message);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
