import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { db } from '../../models';

interface IEducationData {
  name: string;
  code: string;
  location: string;
}

const { UniversityData } = db;

// Get university or college
export const getAllEducationData = async (req: Request, res: Response) => {
  try {
    const educationData = await UniversityData.findAll({ order: [['code', 'ASC']] });
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
  const educationInput: IEducationData = req.body;
  const recordCheck = await UniversityData.findOne({ where: { name: educationInput.name } });
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    if (!recordCheck) {
      try {
        const response = await UniversityData.create(educationInput);
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
    educationInput.map(async (val) => {
      await UniversityData.create({
        name: val.name.trim(),
        code: val.code.trim(),
        location: val.location.trim(),
      });
    });
    res.status(201).json({
      success: true,
    });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

// Patch university or college
export const patchEducationData = async (req: Request, res: Response) => {
  const schoolCode: string = req.params.code;
  const educationInput: IEducationData = req.body;
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      const recordCheck = await UniversityData.findOne({ where: { code: schoolCode } });
      if (recordCheck) {
        const updateResponse = await UniversityData.update(
          { name: educationInput.name, location: educationInput.location },
          { where: { code: schoolCode }, returning: true },
        );
        if (updateResponse[0] === 1) {
          res.status(200).json({ success: true, data: updateResponse[1][0] });
        } else {
          res.status(400);
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
  const schoolCode = req.params.code;
  const recordCheck = await UniversityData.findOne({ where: { code: schoolCode } });
  if (recordCheck) {
    try {
      const deleteResponse = await UniversityData.destroy({ where: { code: schoolCode } });
      if (deleteResponse === 1) {
        res.status(200).json({
          success: true,
          message: `${recordCheck.name} is deleted.`,
        });
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
