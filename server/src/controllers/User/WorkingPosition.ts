import { Request, Response } from 'express';
import { db } from '../../models';
import { validationResult } from 'express-validator';

const { WorkingDepartment, WorkingPosition, CareerTitle } = db;

// Get working position
export const getAllWorkingPosition = async (req: Request, res: Response) => {
  try {
    const workingPosition = await WorkingDepartment.findAll({
      include: [{ model: WorkingPosition, include: [{ model: CareerTitle }] }],
      order: [['departmentCode', 'ASC']],
    });
    res.status(200).json({
      success: true,
      data: workingPosition,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

// Create working department
export const createWorkingDepartment = async (req: Request, res: Response) => {
  const { departmentName } = req.body;
  const recordCheck = await WorkingDepartment.findOne({ where: { departmentName } });
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    if (!recordCheck) {
      try {
        const createResponse = await WorkingDepartment.create({ departmentName });
        res.status(201).json({
          success: true,
          message: `${createResponse.departmentName} is created.`,
          data: createResponse,
        });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
    } else {
      res.status(400).json({
        success: false,
        error: `${departmentName} already exist.`,
      });
    }
  } else {
    res.status(400).json({ success: false, errors: errors.array() });
  }
};

// Create working position
export const createWorkingPosition = async (req: Request, res: Response) => {
  const { positionName, departmentCode } = req.body;
  const recordCheck = await WorkingPosition.findOne({ where: { positionName, departmentCode } });
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    if (!recordCheck) {
      try {
        const createResponse = await WorkingPosition.create({
          positionName,
          departmentCode,
        });
        res.status(201).json({
          success: true,
          message: `${createResponse.positionName} is created.`,
          data: createResponse,
        });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
    } else {
      res.status(400).json({
        success: false,
        error: `${positionName} already exist.`,
      });
    }
  } else {
    res.status(400).json({ success: false, errors: errors.array() });
  }
};

// Create career title
export const createCareerTitle = async (req: Request, res: Response) => {
  const { titleName, positionCode } = req.body;
  const recordCheck = await CareerTitle.findOne({ where: { titleName, positionCode } });
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    if (!recordCheck) {
      try {
        const createResponse = await CareerTitle.create({
          titleName,
          positionCode,
        });
        res.status(201).json({
          success: true,
          message: `${createResponse.titleName} is created.`,
          data: createResponse,
        });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
    } else {
      res.status(400).json({
        success: false,
        error: `${titleName} already exist.`,
      });
    }
  } else {
    res.status(400).json({ success: false, errors: errors.array() });
  }
};
