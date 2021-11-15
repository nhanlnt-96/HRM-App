import express, { Request, Response } from 'express';
import { db } from '../models';

const educationRouter = express.Router();
const { UniversityData } = db;

interface IEducationData {
  name: string;
  code: string;
  location: string;
}

// Get university or college
educationRouter.get('/', async (req: Request, res: Response) => {
  try {
    const educationData = await UniversityData.findAll();
    res.status(200).json({
      success: true,
      data: educationData,
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

// Add a new university or college
educationRouter.post('/', async (req: Request, res: Response) => {
  const educationInput: IEducationData = req.body;
  const name = educationInput.name.trim();
  const code = educationInput.code.trim();
  const location = educationInput.location.trim();
  const recordCheck = await UniversityData.findOne({ where: { name: name } });
  if (!name) {
    res.status(400).json({ error: 'University/College name cannot be empty.' });
  }
  if (!code) {
    res.status(400).json({ error: 'University/College code cannot be empty.' });
  }
  if (!location) {
    res.status(400).json({
      error: 'University/College location cannot be empty.',
    });
  }
  if (name && code && location) {
    if (!recordCheck) {
      try {
        const response = await UniversityData.create({ name, location, code });
        res.status(201).json({
          success: true,
          message: `${response.name} is created.`,
          data: response,
        });
      } catch (error) {
        res.status(400).json(error);
      }
    } else {
      res.status(400).json({ error: `${name} already exist.` });
    }
  }
});

// Add multi new university or college
educationRouter.post('/create-multi', async (req: Request, res: Response) => {
  const educationInput: IEducationData[] = req.body;
  try {
    educationInput.map(async (val) => {
      const name = val.name.trim();
      const code = val.code.trim();
      const location = val.location.trim();
      await UniversityData.create({ name, code, location });
    });
    res.status(201).json({
      success: true,
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

export { educationRouter };
