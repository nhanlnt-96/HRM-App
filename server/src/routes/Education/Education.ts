import express from 'express';
import { body, check } from 'express-validator';
import {
  createMultiEducationData,
  createNewEducationData,
  deleteEducationData,
  getAllEducationData,
  patchEducationData,
} from '../../controllers/Education';

const educationRouter = express.Router();

// Get university or college
educationRouter.get('/', getAllEducationData);

// Create a new university or college
educationRouter.post(
  '/',
  body('name').notEmpty().trim(),
  body('code').notEmpty().trim(),
  body('location').notEmpty().trim(),
  createNewEducationData,
);

// Create multi new university or college using json
educationRouter.post('/create-multi', createMultiEducationData);

// Put university or college
educationRouter.patch(
  '/',
  body('code').notEmpty().trim(),
  check('name').optional().if(body('name').exists()).notEmpty().trim(),
  check('location').optional().if(body('location').exists()).notEmpty().trim(),
  patchEducationData,
);

// Put university or college
educationRouter.delete('/:code', deleteEducationData);

export { educationRouter };
