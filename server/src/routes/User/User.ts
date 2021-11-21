import express from 'express';
import {
  createWorkingDepartment,
  createWorkingPosition,
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
userRouter.put('/working-department/update/:code', body('departmentName').notEmpty().trim(), putWorkingDepartment);

// Create working position
userRouter.post(
  '/working-position',
  body('departmentCode').notEmpty().trim(),
  body('positionName').notEmpty().trim(),
  createWorkingPosition,
);

// Put working position
userRouter.put('/working-position/update/:code', body('positionName').notEmpty().trim(), putWorkingPosition);

export { userRouter };
