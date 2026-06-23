import mongoose, { Schema, model } from 'mongoose';

export interface ISupportChat {
    person_id: mongoose.Types.ObjectId;
    number_order: string;
    created_at: Date;
    updated_at: Date;
    status: string;
}

const supportChatSchema = new Schema<ISupportChat>({
    person_id: { type: Schema.Types.ObjectId, ref: 'Person', required: true },
    number_order: { type: String, required: true },
    status: { type: String, required: true, default: 'open' }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

export const SupportChatModel = model<ISupportChat>('SupportChat', supportChatSchema);
