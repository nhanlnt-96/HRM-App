import express from 'express';
import {
  createCareerTitle,
  createWorkingDepartment,
  createWorkingPosition,
  getAllWorkingPosition,
} from '../../controllers/User';
import { body } from 'express-validator';

const userRouter = express.Router();

// Get working position
userRouter.get('/position', getAllWorkingPosition);

// Create working department
userRouter.post('/working-department', body('departmentName').notEmpty().trim(), createWorkingDepartment);

// Create working position
userRouter.post(
  '/working-position',
  body('departmentCode').notEmpty().trim(),
  body('positionName').notEmpty().trim(),
  createWorkingPosition,
);

// Create career title
userRouter.post(
  '/career-title',
  body('titleName').notEmpty().trim(),
  body('positionCode').notEmpty().trim(),
  createCareerTitle,
);
export { userRouter };
