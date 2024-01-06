import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    _id: {
        type: String,
    },
});

export default mongoose.model('Users', userSchema);