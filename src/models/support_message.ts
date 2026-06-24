/**
 * Support message model
 * - Represents individual messages within a support chat session.
 * - Stores a reference to the chat, the sender role (customer or agent),
 *   message content, read flag, and a timestamp.
 */
import mongoose, { Schema, model } from 'mongoose';

export interface ISupportMessages {
    chat_id: mongoose.Types.ObjectId; // Reference to the SupportChat
    sender: string; // Sender identifier or role (e.g. 'customer', 'agent')
    content: string; // Message text
    date_time: Date; // Message timestamp (managed by Mongoose)
    is_read: boolean; // Read flag
}

const supportMessagesSchema = new Schema<ISupportMessages>({
    chat_id: { type: Schema.Types.ObjectId, ref: 'SupportChat', required: true },
    sender: { type: String, required: true },
    content: { type: String, required: true },
    is_read: { type: Boolean, default: false }
}, {
    timestamps: { createdAt: 'date_time', updatedAt: false }
});

export const SupportMessageModel = model<ISupportMessages>('SupportMessages', supportMessagesSchema);
