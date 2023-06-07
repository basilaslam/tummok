import mongoose from 'mongoose';

// Define schemas
const citySchema = new mongoose.Schema({
  name: String,
  country: String
});

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City'
  }
});

// Create models
export const City = mongoose.model('City', citySchema);
export const User = mongoose.model('User', userSchema);
