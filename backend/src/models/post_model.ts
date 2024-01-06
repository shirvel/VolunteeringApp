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
    link:{
        type: String,
        required: true 
    },
    phoneNumber:{
        type: String,
        required: true
    },
    image:{
        data: Buffer, 
        contentType: String 
    },
    category: {
        type: String,
        required: true
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

export default mongoose.model('post', postSchema);