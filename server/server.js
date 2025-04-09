import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db/db.js';

//importing routers here
import userRoutes from './Routes/userRouter.js';



dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);



connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
