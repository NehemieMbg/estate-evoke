import express, { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import { authMiddleware } from './middlewares/authMiddleware';
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary';
import path from 'path';

import userRouter from './routes/userRouter';
import authRouter from './routes/authRouter';
import postRouter from './routes/postRouter';

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME as string,
  api_key: process.env.CLOUD_API_KEY as string,
  api_secret: process.env.CLOUD_API_SECRET as string,
  secure: true,
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// allow access to public folder to get images
app.use(express.static(path.resolve(__dirname, './public')));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', authMiddleware, userRouter);
app.use('/api/v1/posts', postRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
});

export default app;
