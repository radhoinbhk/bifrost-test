import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const connectDB = async () => {
  let mongoDB = process.env.MONGO_URI || 'mongodb+srv://Admin:root@cluster0.v9bbznf.mongodb.net/?retryWrites=true&w=majority';
  try {
      await mongoose.connect(mongoDB);
      console.log('Database Connected');
    } catch (err) {
      console.error('MongoDB connection error:',err);
      process.exit(1);
    }
};

export default connectDB;