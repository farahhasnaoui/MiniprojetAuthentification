
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import userRoutes from './api/user/userRoutes';
import User from './models/User'
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI || '')
.then(() => {
  console.log('MongoDB connected');
  createAdminUserIfNeeded();
})
  async function createAdminUserIfNeeded() {
    const adminUser = await User.findOne({ roles: 'admin' });
    if (!adminUser) {
      const adminEmail = 'farah.hasnaoui@esprit.tn'; 
      const adminPassword = 'kenzafarah'; 
      const newAdmin = new User({
        email: adminEmail,
        password: adminPassword,
        roles: ['admin']
      });
      await newAdmin.save();
      console.log('Admin user created');
    } else {
      console.log('Admin user already exists');
    }
  }
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api/users', userRoutes);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
