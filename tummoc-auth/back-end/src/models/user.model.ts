// src/models/user.ts
import mongoose, { Schema, type Document } from 'mongoose';

export type IUser = Document & {
  username: string;
  email: string;
  password: string;
  googleId: string;
};

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: false },
  googleId: { type: String, required: false },
  provider: { type: String, required: true },
});

export default mongoose.model<IUser>('User', UserSchema);
