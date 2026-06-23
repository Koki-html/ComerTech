import mongoose, { Schema, model } from 'mongoose';

export interface ISupportMessages {
    chat_id: mongoose.Types.ObjectId;
    sender: string;
    content: string;
    date_time: Date;
    is_read: boolean;
}

const supportMessagesSchema = new Schema<ISupportMessages>({
    chat_id: { type: Schema.Types.ObjectId, ref: 'SupportChat', required: true },
    sender: { type: String, required: true },
    content: { type: String, required: true },
    is_read: { type: Boolean, default: false }
}, {
    timestamps: { createdAt: 'date_time', updatedAt: false }
});

export const SupportMessagesModel = model<ISupportMessages>('SupportMessages', supportMessagesSchema);
