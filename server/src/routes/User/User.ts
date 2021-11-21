import express from 'express';
import {
  createWorkingDepartment,
  createWorkingPosition,
  deleteWorkingDepartment,
  deleteWorkingPosition,
  getAllWorkingPosition,
  putWorkingDepartment,
  putWorkingPosition,
} from '../../controllers/User';
import { body, check } from 'express-validator';

const userRouter = express.Router();

// Get working position
userRouter.get('/position', getAllWorkingPosition);

// Create working department
userRouter.post('/working-department', body('departmentName').notEmpty().trim(), createWorkingDepartment);

// Put working department
userRouter.put(
  '/working-department',
  body('departmentName').notEmpty().trim(),
  body('departmentCode').notEmpty().trim(),
  putWorkingDepartment,
);

// Delete working department
userRouter.delete('/working-department/:code', deleteWorkingDepartment);

// Create working position
userRouter.post(
  '/working-position',
  body('departmentCode').notEmpty().trim(),
  body('positionName').notEmpty().trim(),
  createWorkingPosition,
);

// Put working position
userRouter.put(
  '/working-position',
  body('positionCode').notEmpty().trim(),
  body('positionName').notEmpty().trim(),
  putWorkingPosition,
);

// Put working position
userRouter.delete('/working-position/:code', deleteWorkingPosition);

export { userRouter };
