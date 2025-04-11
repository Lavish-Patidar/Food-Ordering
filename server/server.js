import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './db/db.js';
import adminRouter from './Routes/adminRouter.js'

//importing routers here
import userRoutes from './Routes/userRouter.js';




dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/users', userRoutes);

app.use('/admin', adminRouter)



connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
