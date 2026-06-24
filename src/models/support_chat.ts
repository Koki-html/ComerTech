/**
 * Support chat model
 * - Represents a support ticket or chat session initiated by a customer.
 * - Links to the `Person` who opened the chat and optionally the related order.
 */
import mongoose, { Schema, model } from 'mongoose';

export interface ISupportChat {
    person_id: mongoose.Types.ObjectId; // Reference to Person who opened the chat
    number_order: string; // Order number related to the support request
    created_at: Date; // Creation timestamp (managed by Mongoose)
    updated_at: Date; // Update timestamp (managed by Mongoose)
    status: string; // Chat status (open, closed, resolved)
}

const supportChatSchema = new Schema<ISupportChat>({
    person_id: { type: Schema.Types.ObjectId, ref: 'Person', required: true },
    number_order: { type: String, required: true },
    status: { type: String, required: true, default: 'open' }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

export const SupportChatModel = model<ISupportChat>('SupportChat', supportChatSchema);
