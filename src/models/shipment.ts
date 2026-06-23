import mongoose, { Schema, model } from 'mongoose';

export interface IShipment {
    company: string;
    tracking_number: string;
    receipt_number: string;
    mailing_address: string;
    status: string;
}

const shipmentSchema = new Schema<IShipment>({
    company: { type: String, required: true },
    tracking_number: { type: String, required: true, unique: true },
    receipt_number: { type: String, required: true },
    mailing_address: { type: String, required: true },
    status: { type: String, required: true, default: 'pending' }
});

export const ShipmentModel = model<IShipment>('Shipment', shipmentSchema);
