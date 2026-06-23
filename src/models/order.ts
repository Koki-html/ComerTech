import mongoose, { Schema, model } from 'mongoose';

export interface IOrderProduct {
    product_id: mongoose.Types.ObjectId;
    amount: number;
    unit_price: number;
}

export interface IOrder {
    receipt_number: string;
    person_id: mongoose.Types.ObjectId;
    products: IOrderProduct[];
    total_price: number;
    status: string;
    created_at: Date;
    updated_at: Date;
}

const orderSchema = new Schema<IOrder>({
    receipt_number: { type: String, required: true, unique: true },
    person_id: { type: Schema.Types.ObjectId, ref: 'Person', required: true },
    products: [{
        product_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        amount: { type: Number, required: true },
        unit_price: { type: Number, required: true }
    }],
    total_price: { type: Number, required: true },
    status: { type: String, required: true, default: 'pending' }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

export const OrderModel = model<IOrder>('Order', orderSchema);
