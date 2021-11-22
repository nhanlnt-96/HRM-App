import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import {
  checkEducationExist,
  createEducation,
  createMultiEducation,
  deleteEducation,
  getEducation,
  IEducationData,
  updateEducation,
} from './Business';

// Get university or college
export const getAllEducationData = async (req: Request, res: Response) => {
  try {
    const educationData = await getEducation();
    res.status(200).json({
      success: true,
      data: educationData,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

// Create a new university or college
export const createNewEducationData = async (req: Request, res: Response) => {
  const educationInput = req.body;
  const recordCheck = await checkEducationExist(educationInput.code);
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    if (!recordCheck) {
      try {
        const response = await createEducation(educationInput);
        res.status(201).json({
          success: true,
          message: `${response.name} is created.`,
          data: response,
        });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
    } else {
      res.status(400).json({
        success: false,
        error: `${educationInput.name} already exist.`,
      });
    }
  } else {
    res.status(400).json({ success: false, errors: errors.array() });
  }
};

// Create multi new university or college using json
export const createMultiEducationData = async (req: Request, res: Response) => {
  const educationInput: IEducationData[] = req.body;
  try {
    await createMultiEducation(educationInput);
    res.status(201).json({
      success: true,
    });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

// Patch university or college
export const patchEducationData = async (req: Request, res: Response) => {
  const educationInput = req.body;
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      const recordCheck = await checkEducationExist(educationInput.code);
      if (recordCheck) {
        const updateResponse = await updateEducation(educationInput);
        if (updateResponse[0] === 1) {
          res.status(200).json({ success: true, data: updateResponse[1][0] });
        } else {
          res.status(400).json({ success: false, message: 'Update failed.' });
        }
      } else {
        res.status(400).json({
          success: false,
          error: "University/College doesn't exist.",
        });
      }
    } catch (error) {
      res.status(400).json({ success: false, error });
    }
  } else {
    res.status(400).json({ success: false, errors: errors.array() });
  }
};

// Delete university or college
export const deleteEducationData = async (req: Request, res: Response) => {
  const code = req.params.code;
  const recordCheck = await checkEducationExist(code);
  if (recordCheck) {
    try {
      const deleteResponse = await deleteEducation(code);
      if (deleteResponse === 1) {
        res.status(200).json({
          success: true,
          message: `${recordCheck.name} is deleted.`,
        });
      } else {
        res.status(400).json({ success: false, message: 'Delete failed.' });
      }
    } catch (error) {
      res.status(400).json({ success: false, error });
    }
  } else {
    res.status(400).json({
      success: false,
      error: "University/College doesn't exist.",
    });
  }
};
