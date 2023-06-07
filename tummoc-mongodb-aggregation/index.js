import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.router.js'; // Update the file path here

const app = express();
const port = 3000;

app.use(express.urlencoded());
app.use(express.json());
app.use('/', userRouter);

(async () => {
  try {
    const connection = await mongoose.connect('mongodb://0.0.0.0:27017/tummoc', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Database Connected');
  } catch (error) {
    console.log(error);
  }
})();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
