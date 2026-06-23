import mongoose, { Schema, model } from 'mongoose';

export interface IPayment {
    order_id: mongoose.Types.ObjectId;
    amount: number;
    payment_method: string;
    status: string;
    created_at: Date;
}

const paymentSchema = new Schema<IPayment>({
    order_id: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
    amount: { type: Number, required: true },
    payment_method: { type: String, required: true },
    status: { type: String, required: true, default: 'pending' }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: false }
});

export const PaymentModel = model<IPayment>('Payment', paymentSchema);
