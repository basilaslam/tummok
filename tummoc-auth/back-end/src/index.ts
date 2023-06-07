import express, { type Express } from 'express';
import * as dotenv from 'dotenv';
import userRouter from './routes/user.route';
import cors from 'cors';
import mongoose from 'mongoose';
import passport from 'passport';
dotenv.config();

const BACKEND_URL = process.env.BACKEND_URL ?? '';
const FRONTEND_URL = process.env.FRONTEND_URL ?? '';
const app: Express = express();
// setting up cors
const allowedOrigins = [BACKEND_URL, FRONTEND_URL];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

// Then pass these options to cors:
app.use(cors(options));

const PORT = process.env.PORT ?? 3000;
const mongodbURI = process.env.MONGO_URI ?? '';

console.log(mongodbURI);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// you can create your own route files in route directory
app.use('/api', userRouter);

if (mongodbURI != null) {
  mongoose
    .connect(mongodbURI)
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
      console.log('MongoDB connected');
    })
    .catch((err: any) => {
      console.log(err);
    });
}
