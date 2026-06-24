/**
 * Person model
 * - Stores customer/user profile information required for orders and support.
 * - Includes contact details, authentication hash, and postal address.
 */
import mongoose, { Schema, Document } from 'mongoose';

// Shape of a person/customer document
export interface IPerson {
    name : string; // Full name
    rut: string; // National ID or unique identifier
    mail: {
        mail_adress: string; // Email address
        is_verified: boolean; // Email verification flag
    };
    phone: string; // Primary phone number
    alt_phone: string; // Optional secondary phone number
    password_hash: string; // Hashed password for authentication
    birth_date: string; // Birth date (stored as string or date)
    gender: string; // Gender
    adress: {
        region: string; // Region/State
        comune: string; // Municipality
        street: string;
        number: string; // Street number
        apartment: string; // Optional apartment/unit
    }

}

// Mongoose schema for person documents
const PersonSchema: Schema = new Schema({
    name: { type: String, required: true},
    rut: { type: String, required: true},
    mail: {
        mail_adress: {type: String, required: true, unique: true },
        is_verified: {type: Boolean, default: false },
        },
    phone: {type: String, required: true},
    alt_phone: {type: String},
    password_hash: { type: String, required: true},
    birth_date: { type: Date, required: true },
    gender: { type: String, required: true },
    adress: {
        region: { type: String, required: true },
        comune: { type: String, required: true },
        street: { type: String, required: true },
        number: { type: String, required: true },
        apartment: { type: String },
    },
});

export const PersonModel = mongoose.model<IPerson>('Person', PersonSchema);

