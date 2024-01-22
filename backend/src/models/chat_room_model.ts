import mongoose, { Schema } from 'mongoose';
import { IChatRoom } from '../common/chat_handler';


const chatRoomSchema = new mongoose.Schema<IChatRoom>({
    category_name: {
        type: String,
        required: true
    },
    messages: {
        type: Schema.Types.Mixed,
        required: true
    },
});

export default mongoose.model<IChatRoom>('ChatRoom', chatRoomSchema);