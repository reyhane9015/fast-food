import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { User } from './../../../models/User';

// import { MongoDBAdapter } from "@auth/mongodb-adapter"
// import { clientPromise } from '@/libs/mongoConnect';


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });


export const authOptions = {

    secret: process.env.SECRET,
    // adapter: MongoDBAdapter(clientPromise),

    providers: [
        CredentialsProvider({
          name: 'Credentials',
          id: 'credentials',
          credentials: {
            email: { label: "Email", type: "email", placeholder: "test@example.com" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
              
          try {
                const { email, password } = credentials;
                const user = await User.findOne({email});
                
                if (!user) {
                    throw new Error("User not found");
                }
        
                const passwordOk = await bcrypt.compare(password, user.password);
        
                if (!passwordOk) {
                    throw new Error("Incorrect password");
                }

                return user;
            }
            catch (error) {
                return null
            }
          }
        })
      ],

      callbacks: {
        async redirect({ url, baseUrl }) {
          return url.startsWith(baseUrl) ? url : baseUrl;
        },
      },
    
      pages: {
        signIn: "/login",
        error: "/login",
        signOut: "/",
      },
 
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }