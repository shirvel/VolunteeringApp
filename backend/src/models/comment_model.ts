import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    post_id: {
        type: String,
        required: true
    },
    user_id:{
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
});

export default mongoose.model('Comment', commentSchema);