import mongoose from "mongoose";
import { User } from "./../../models/User";

export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);

  const data = await req.json();
  const UserDoc = await User.create(data);
  return Response.json(UserDoc);
}

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);

  const { _id, ...data } = await req.json();
  await User.findByIdAndUpdate(_id, data);
  return Response.json(true);
}

export async function GET() {
  mongoose.connect(process.env.MONGO_URL);

  const users = await User.find();
  return Response.json(users);
}

export async function DELETE(req) {
  mongoose.connect(process.env.MONGO_URL);

  const { _id } = await req.json();
  await User.deleteOne({ _id });
  return Response.json(true);
}
