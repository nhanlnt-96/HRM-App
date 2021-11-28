import express from 'express';
import { createUser, getAllUser } from '../../controllers/User';
import { body, check } from 'express-validator';

const userRouter = express.Router();

// Get all user
userRouter.get('/', getAllUser);

// Create user
userRouter.post(
  '/',
  body('password').notEmpty().trim(),
  body('fullName').notEmpty().trim(),
  body('email').notEmpty().trim().isEmail().normalizeEmail(),
  body('phoneNumber').notEmpty().trim(),
  body('cardId').notEmpty().trim(),
  body('issuedOn').notEmpty().trim(),
  body('issuedAt').notEmpty().trim(),
  body('currentAddress').notEmpty().trim(),
  body('educationCode').notEmpty().trim(),
  body('majorIn').notEmpty().trim(),
  body('salaryRange').notEmpty().trim(),
  body('positionId').notEmpty().trim(),
  body('salaryRange').notEmpty().trim(),
  check('level').optional().if(body('level').exists()).notEmpty().trim(),
  check('userId').optional().if(body('userId').exists()).notEmpty().trim(),
  check('allowance').optional().if(body('allowance').exists()).notEmpty().trim(),
  check('allowanceDescription').optional().if(body('allowanceDescription').exists()).notEmpty().trim(),
  check('contractDescription').optional().if(body('contractDescription').exists()).notEmpty().trim(),
  check('contractFrom').optional().if(body('contractFrom').exists()).notEmpty().trim(),
  check('contractTo').optional().if(body('contractTo').exists()).notEmpty().trim(),
  check('certificationDescription').optional().if(body('certificationDescription').exists()).notEmpty().trim(),
  check('certificationUrl').optional().if(body('certificationUrl').exists()).notEmpty().trim(),
  createUser,
);

export { userRouter };
