import mongoose , { model, models , Schema } from 'mongoose';


const ExtraPriceSchema = new Schema({
    name: String,
    price: Number
})

const CartProductSchema = new Schema({
    name: {type: String , required: true},
    description: {type: String},
    basePrice: {type: Number},
    ratings: {type: Number, default: 0, min: 0, max: 5},
    sizes: {type: [ExtraPriceSchema]},
    extraItems: {type: [ExtraPriceSchema]},
    category: {type: mongoose.Types.ObjectId},
    freeShipping: {type: Boolean , default: false}
});

const CardInfoSchema = new Schema({
    cardNumber: {type: String}, 
    expiryDate: {type: String},
    cvv: {type: String} 
})

const UserShema = new Schema({
    phone: {type: String},
    streetAddress: {type: String},
    postalCode: {type: String},
    city: {type: String},
    country: {type: String},
})

const OrderSchema = new Schema({
    userEmail: {type: String},
    user:[UserShema],
    cartProducts: [CartProductSchema],
    totalPrice: {type: Number},
    paid: { type: Boolean, default: false },
    cardInfo: {type: CardInfoSchema},
}, { timestamps: true });


export const Order = models?.Order || model('Order', OrderSchema);
