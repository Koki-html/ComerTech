/**
 * Payment model
 * - Represents payment transactions related to orders.
 * - Stores a reference to the paid order, the paid amount, the payment method,
 *   and the current status of the payment.
 */
import mongoose, { Schema, model } from 'mongoose';

// Payment document shape
export interface IPayment {
    order_id: mongoose.Types.ObjectId; // Reference to the related Order
    amount: number; // Amount paid
    payment_method: string; // e.g. credit_card, debit_card, cash
    status: string; // Payment status (e.g. pending, completed, failed)
    created_at: Date; // Creation timestamp (managed by Mongoose)
}

// Mongoose schema for payments
const paymentSchema = new Schema<IPayment>({
    order_id: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
    amount: { type: Number, required: true },
    payment_method: { type: String, required: true },
    status: { type: String, required: true, default: 'pending' }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: false }
});

export const PaymentModel = model<IPayment>('Payment', paymentSchema);
