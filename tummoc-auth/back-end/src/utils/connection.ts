import mongoose from 'mongoose';
import * as env from 'dotenv';
env.config();
const mongoUri = process.env.MONGO_URI ?? '';

async function connect() {
  try {
    if (mongoUri != null) {
      await mongoose.connect(mongoUri);

      console.log('MongoDB connected');
    }
  } catch (err) {
    console.log(err);
  }
}

export { connect };
