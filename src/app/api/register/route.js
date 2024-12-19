import { User } from './../../models/User';
import mongoose from 'mongoose';
import bcrypt from "bcrypt";

export async function POST(req) {
    mongoose.connect(process.env.MONGO_URL);

    const body = await req.json();
    const pass = body.password;
   
    if(!pass?.length || pass.length < 5) {
        new Error('password must be at least 5 characters');
    }

    const newName = body.email.split('@')[0];
    body.name = newName;
  

    const notHashedPassword = pass;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(notHashedPassword, salt);

    body.password = hashedPassword;
    const createdUser = await User.create(body);

    return Response.json(createdUser);
}

