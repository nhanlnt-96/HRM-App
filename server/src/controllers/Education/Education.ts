import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { db } from '../../models';
import { checkDataExist, deleteData, updateData } from '../../helpers';

interface IEducation {
  name: string;
  location: string;
  code: string;
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
  const { name, code, location } = req.body;
  const recordCheck = await checkDataExist(UniversityData, { name });
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    if (!recordCheck) {
      try {
        const response = await UniversityData.create({ name, code, location });
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
        error: `${name} already exist.`,
      });
    }
  } else {
    res.status(400).json({ success: false, errors: errors.array() });
  }
};

// Create multi new university or college using json
export const createMultiEducationData = async (req: Request, res: Response) => {
  const educationInput: IEducation[] = req.body;
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
  const { code, name, location } = req.body;
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      const recordCheck = await UniversityData.findOne({ where: { code } });
      if (recordCheck) {
        await updateData(res, UniversityData, { code }, { name, location });
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
  const recordCheck = await UniversityData.findOne({ where: { code } });
  if (recordCheck) {
    try {
      await deleteData(res, UniversityData, code, recordCheck.name);
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
