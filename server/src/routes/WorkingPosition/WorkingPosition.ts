import express from 'express';
import {
  createWorkingDepartment,
  createWorkingPosition,
  deleteWorkingDepartment,
  deleteWorkingPosition,
  getAllWorkingPosition,
  putWorkingDepartment,
  putWorkingPosition,
} from '../../controllers/WorkingPosition';
import { body, check } from 'express-validator';

const positionRouter = express.Router();

// Get working position
positionRouter.get('/', getAllWorkingPosition);

// Create working department
positionRouter.post(
  '/working-dept',
  body('departmentName').notEmpty().trim(),
  check('createdBy').optional().if(body('createdBy').exists()).notEmpty().trim(),
  createWorkingDepartment,
);

// Put working department
positionRouter.put(
  '/working-dept/:code',
  body('departmentName').notEmpty().trim(),
  body('updatedBy').notEmpty().trim(),
  putWorkingDepartment,
);

// Delete working department
positionRouter.delete('/working-dept/:code', deleteWorkingDepartment);

// Create working position
positionRouter.post(
  '/working-position',
  body('departmentId').notEmpty().trim(),
  body('positionName').notEmpty().trim(),
  createWorkingPosition,
);

// Put working position
positionRouter.put('/working-position/:code', body('positionName').notEmpty().trim(), putWorkingPosition);

// Delete working position
positionRouter.delete('/working-position/:code', deleteWorkingPosition);

export { positionRouter };
