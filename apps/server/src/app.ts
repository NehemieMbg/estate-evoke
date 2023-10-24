import express, { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import userRouter from './routes/userRouter';
import authRouter from './routes/authRouter';
import { authMiddleware } from './middlewares/authMiddleware';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', authMiddleware, userRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
});

export default app;
