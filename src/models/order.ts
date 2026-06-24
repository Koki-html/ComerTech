/**
 * Order model
 * - Defines TypeScript interfaces and a Mongoose schema for customer orders.
 * - An order contains a unique receipt number, a reference to the buyer,
 *   a list of ordered products (product reference, quantity and unit price),
 *   the total price, and a status field.
 */
import mongoose, { Schema, model } from 'mongoose';

// Single product entry inside an order
export interface IOrderProduct {
    product_id: mongoose.Types.ObjectId; // Reference to a Product document
    amount: number; // Quantity ordered
    unit_price: number; // Price per item at time of purchase
}

// Order document shape
export interface IOrder {
    receipt_number: string; // Unique order identifier
    person_id: mongoose.Types.ObjectId; // Reference to the Person who placed the order
    products: IOrderProduct[]; // Items included in the order
    total_price: number; // Order total
    status: string; // Order status (e.g. pending, confirmed, shipped)
    created_at: Date; // Creation timestamp (managed by Mongoose)
    updated_at: Date; // Update timestamp (managed by Mongoose)
}

// Mongoose schema for orders
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
