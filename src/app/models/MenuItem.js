import mongoose, { model, models, Schema } from "mongoose";

const ExtraPriceSchema = new Schema({
  name: String,
  price: Number,
});

const MenuItemSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    basePrice: { type: Number },
    quantity: { type: Number, default: 0 },
    ratings: { type: Number, default: 0, min: 0, max: 5 },
    sizes: { type: [ExtraPriceSchema] },
    extraItems: { type: [ExtraPriceSchema] },
    category: { type: mongoose.Types.ObjectId },
    freeShipping: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const MenuItem = models?.MenuItem || model("MenuItem", MenuItemSchema);
