import mongoose, { Schema, Document } from 'mongoose';

export interface IPerson {
    name : string,
    rut: string,
    mail: {
        mail_adress: string,
        is_verified: boolean
    },
    phone: string,
    alt_phone: string,
    password_hash: string,
    birth_date: string,
    gender: string,
    adress: {
        region: string,
        comune: string,
        street: string,
        number: string,
        apartment: string
    }

}

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

export const Person = mongoose.model<IPerson>('Person', PersonSchema);

