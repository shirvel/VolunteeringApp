import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
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
        type: String 
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
          type: String,
        },
      ],
    dislikes: {
        type: Number,
        default: 0
    },
    dislikedBy: [
        {
            type: String,
        },
    ],
    location: {
        type: String,
        required: true
    },
});

export default mongoose.model('Post', postSchema);