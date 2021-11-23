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
import { ApiError, ApiSuccess } from '../../shared/helper';

// Get university or college
export const getAllEducationData = async (req: Request, res: Response) => {
  try {
    const educationData = await getEducation();
    ApiSuccess(200, educationData, res);
  } catch (error) {
    ApiError(400, error, res);
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
        ApiSuccess(
          201,
          {
            message: `${response.name} is created.`,
            data: response,
          },
          res,
        );
      } catch (error) {
        ApiError(400, error, res);
      }
    } else {
      ApiError(400, `${educationInput.name} already exist.`, res);
    }
  } else {
    ApiError(400, errors.array(), res);
  }
};

// Create multi new university or college using json
export const createMultiEducationData = async (req: Request, res: Response) => {
  const educationInput: IEducationData[] = req.body;
  try {
    await createMultiEducation(educationInput);
    ApiSuccess(201, 'Create complete', res);
  } catch (error) {
    ApiError(400, error, res);
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
          ApiSuccess(200, updateResponse[1][0], res);
        } else {
          ApiError(400, 'Update failed.', res);
        }
      } else {
        ApiError(400, "University/College doesn't exist.", res);
      }
    } catch (error) {
      ApiError(400, error, res);
    }
  } else {
    ApiError(400, errors.array(), res);
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
        ApiSuccess(200, `${recordCheck.name} is deleted.`, res);
      } else {
        ApiError(400, 'Delete failed.', res);
      }
    } catch (error) {
      ApiError(400, error, res);
    }
  } else {
    ApiError(400, "University/College doesn't exist.", res);
  }
};
