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
        type: String,
        required: true
    }, 
    likes: {
        type: Number,
        default: 0
    },
    likedBy: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
    dislikes: {
        type: Number,
        default: 0
    }
});

export default mongoose.model('Post', postSchema);