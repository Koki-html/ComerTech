/**
 * Shipment model
 * - Tracks delivery information for orders.
 * - Includes carrier, unique tracking number, related order receipt number,
 *   mailing address, and delivery status.
 */
import mongoose, { Schema, model } from 'mongoose';

export interface IShipment {
    company: string; // Shipping carrier name
    tracking_number: string; // Unique tracking identifier
    receipt_number: string; // Related order receipt number
    mailing_address: string; // Destination address
    status: string; // Delivery status (e.g. pending, shipped, delivered)
}

const shipmentSchema = new Schema<IShipment>({
    company: { type: String, required: true },
    tracking_number: { type: String, required: true, unique: true },
    receipt_number: { type: String, required: true },
    mailing_address: { type: String, required: true },
    status: { type: String, required: true, default: 'pending' }
});

export const ShipmentModel = model<IShipment>('Shipment', shipmentSchema);
