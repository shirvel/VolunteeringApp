import mongoose from 'mongoose';

export interface IUser {
    email: string;
    password: string;
    name: string;
    _id?: string;
    refreshTokens?: string[];
  }

const userSchema = new mongoose.Schema<IUser>({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    refreshTokens: {
        type: [String],
        required: false,
      },
   
});

export default mongoose.model<IUser>('User', userSchema);