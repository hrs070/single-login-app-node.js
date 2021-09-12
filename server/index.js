import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import mongoose from "mongoose";

import AuthRouter from './Routes/authRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

app.use('/users', AuthRouter);

mongoose.connect(process.env.CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`)))
    .catch((error) => console.log(error));