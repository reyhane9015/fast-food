import { MenuItem } from './../../models/MenuItem';
import mongoose from 'mongoose';

export async function POST(req) {

    mongoose.connect(process.env.MONGO_URL);

    // const data = await req.json();

    // if (data.category && data.category._id) {
    //     data.category = data.category._id;
    // }

    const {_id , category, ...data}= await req.json();

    if (category && category._id) {
        data.category = category._id;
    }


    const MenuItemDoc = await MenuItem.create(data);
    return Response.json(MenuItemDoc);
}


export async function PUT(req) {

    mongoose.connect(process.env.MONGO_URL);

    const {_id , category, ...data}= await req.json();

    if (category && category._id) {
        data.category = category._id;
    }
    
    await MenuItem.findByIdAndUpdate(_id , data);
    return Response.json(true);
}


export async function GET() {

    mongoose.connect(process.env.MONGO_URL);

    return Response.json(
        await MenuItem.find()
    )
}


export async function DELETE(req) {

    mongoose.connect(process.env.MONGO_URL);

    const { _id } = await req.json();
    await MenuItem.deleteOne({_id});
    return Response.json(true);
}