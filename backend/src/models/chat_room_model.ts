import mongoose, { Schema } from 'mongoose';

export type ChatMessage = {content: string, user_id: string};
export interface IChatRoom {
    category_id: string;
    messages: ChatMessage;
    _id?: string;
  }

const chatRoomSchema = new mongoose.Schema<IChatRoom>({
    category_id: {
        type: String,
        required: true
    },
    messages: {
        type: Schema.Types.Mixed,
        required: true
    },
});

export default mongoose.model<IChatRoom>('ChatRoom', chatRoomSchema);