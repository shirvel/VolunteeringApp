import mongoose from 'mongoose';

export interface IUser {
    name?: string;
    email: string;
    password: string;
    _id?: string;
    refreshTokens?: string[];
  }

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: false
        // required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    refreshTokens: {
        type: [String],
        required: false,
      },
   
});

export default mongoose.model<IUser>('User', userSchema);