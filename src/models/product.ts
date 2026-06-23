import mongoose, { Schema, model } from 'mongoose';

// By a simplify becouse this is a homework, i will do this.. (i don't want to create any type of feature posible.. Sorry)
interface IFeatureCellPhones {
    ram: number;
    storage: string;
}

interface IFeatureClothes {
    size?: string;
    color?: string;
}

interface IFeatureVideogames {
    platform?: string;
}

export interface IProduct {
    name: string;
    model: string;
    brand: string;
    price: number;
    type_product: string;
    created_at: Date;
    updated_at: Date;
    stock: number;
    specs: IFeatureCellPhones | IFeatureClothes | IFeatureVideogames;
    description: string;
    images: string[];
    is_active: boolean;
}

const productSchema = new Schema<IProduct>({
    model: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    type_product: { type: String, required: true },
    stock: { type: Number, required: true },
    specs: { type: Schema.Types.Mixed, required: true },
    description: { type: String, default: "" },
    images: { type: [String], default: [] },
    is_active: { type: Boolean, default: true }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

export const ProductModel = model<IProduct>('Product', productSchema);
