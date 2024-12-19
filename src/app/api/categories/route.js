import { Category } from './../../models/Category';
import mongoose from 'mongoose';

export async function POST(req) {

    mongoose.connect(process.env.MONGO_URL);

    const {name} = await req.json();
    const CategoryDoc = await Category.create({name});
    return Response.json(CategoryDoc);
}


export async function PUT(req) {

    mongoose.connect(process.env.MONGO_URL);

   const{_id , name} = await req.json();
   await Category.updateOne({_id} ,{name});
   return Response.json(true);
}


export async function GET() {

    mongoose.connect(process.env.MONGO_URL);

    return Response.json(
        await Category.find()
    )
}

export async function DELETE(req) {

    mongoose.connect(process.env.MONGO_URL);

    const { categoryId } = await req.json();
    await Category.deleteOne({_id: categoryId});
    return Response.json(true);
}