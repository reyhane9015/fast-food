import mongoose from 'mongoose';
import { getServerSession } from 'next-auth';
import { authOptions } from './../auth/[...nextauth]/route';
import { Order } from './../../models/Order';
import { User } from './../../models/User';


export async function POST(req) {

    mongoose.connect(process.env.MONGO_URL);

    const {user , cartProducts , totalPrice} = await req.json();

    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    const OrderDoc = await Order.create({userEmail , user , cartProducts , totalPrice});
    return Response.json(OrderDoc);

}


export async function PUT(req) {

    mongoose.connect(process.env.MONGO_URL);

    const { _id, cardInfo, paid } = await req.json();
    const order = await Order.findById(_id);

    if (!order) {
        return new Response.json({ error: 'Order not found' });
    }

    if (paid) {
        order.paid = true;
    }

    if (cardInfo) {
        order.cardInfo = cardInfo;
    }


    await order.save(); 

    return Response.json(order);

}

export async function GET() {

    await mongoose.connect(process.env.MONGO_URL);

  
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

   
    if (!userEmail) {
        return new Response(null, { status: 401 });
    }

    const user = await User.findOne({ email: userEmail });

    // console.log('User is:', user);

 
    if (!user) {
        return new Response(null, { status: 404 });
    }

    // console.log('User admin status:', user.admin);

    
    let orders;
    if (user.admin) {
        // If the user is an admin, query all orders
        orders = await Order.find();
        // console.log('All orders:', orders);
    } else {
        // If the user is not an admin, query only the user's orders
        orders = await Order.find({ userEmail: userEmail });
        // console.log('User orders:', orders);
    }

    // Return the orders as a JSON response
    return new Response(JSON.stringify(orders), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export async function DELETE(req) {

    mongoose.connect(process.env.MONGO_URL);

    const { _id } = await req.json();
    await Order.deleteOne({_id});
    return Response.json(true);
}
