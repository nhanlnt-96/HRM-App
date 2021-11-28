import express from 'express';
import { body } from 'express-validator';
import { loginUser } from '../../controllers/Auth';

const authRouter = express.Router();

// Login user
authRouter.post('/', body('username').notEmpty().trim(), body('password').notEmpty().trim(), loginUser);

export { authRouter };
