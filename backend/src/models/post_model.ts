import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true        
    },
    phoneNumber:{
        type: String,
        required: true
    },
    image:{
        type: String, 
        required: true 
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }, 
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    }
});

export default mongoose.model('Post', postSchema);