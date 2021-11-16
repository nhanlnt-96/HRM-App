import express from 'express';
import { getAllWorkingPosition } from '../../controllers/User';

const userRouter = express.Router();

// Get working position
userRouter.get('/position', getAllWorkingPosition);

export { userRouter };
