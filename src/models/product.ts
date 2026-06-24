/**
 * Product model
 * - Represents catalog items with flexible `specs` depending on the product type.
 * - Small feature interfaces are provided for common product categories such as
 *   cell phones, clothes, and videogames.
 */
import mongoose, { Schema, model } from 'mongoose';

// Example feature types for different product categories
interface IFeatureCellPhones {
    ram: number; // RAM size in GB
    storage: string; // Storage description (e.g. "128GB")
}

interface IFeatureClothes {
    size?: string; // Optional size (S, M, L, etc.)
    color?: string; // Optional color
}

interface IFeatureVideogames {
    platform?: string; // e.g. PC, PS5, Xbox
}

// Product document shape
export interface IProduct {
    name: string; // Product display name
    model: string; // Model or SKU
    brand: string; // Manufacturer
    price: number; // Current price
    type_product: string; // Category/type of product
    created_at: Date; // Creation timestamp (managed by Mongoose)
    updated_at: Date; // Update timestamp (managed by Mongoose)
    stock: number; // Units available
    specs: IFeatureCellPhones | IFeatureClothes | IFeatureVideogames; // Dynamic specs
    description: string; // Description text
    images: string[]; // Array of image URLs
    is_active: boolean; // Active flag for catalog visibility
}

// Mongoose schema for products
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
