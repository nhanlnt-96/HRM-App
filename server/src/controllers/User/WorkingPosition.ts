import { Request, Response } from 'express';
import { db } from '../../models';
import { validationResult } from 'express-validator';
import { checkDataExist, deleteData, updateData } from '../../helpers';

const { WorkingDepartment, WorkingPosition } = db;

// Get working position
export const getAllWorkingPosition = async (req: Request, res: Response) => {
  try {
    const workingPosition = await WorkingDepartment.findAll({
      include: [WorkingPosition],
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
  const recordCheck = await checkDataExist(WorkingDepartment, { departmentName });
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

// Put working department
export const putWorkingDepartment = async (req: Request, res: Response) => {
  const { departmentName, departmentCode } = req.body;
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      const recordCheck = await checkDataExist(WorkingDepartment, { departmentCode });
      const departmentNameCheck = await checkDataExist(WorkingDepartment, { departmentName });
      if (recordCheck) {
        if (!departmentNameCheck) {
          await updateData(res, WorkingDepartment, { departmentCode }, { departmentName });
        } else {
          res.status(400).json({
            success: false,
            error: `${departmentName} already exist.`,
          });
        }
      } else {
        res.status(400).json({
          success: false,
          error: `${departmentName} doesn't exist.`,
        });
      }
    } catch (error) {
      res.status(400).json({ success: false, error });
    }
  } else {
    res.status(400).json({ success: false, errors: errors.array() });
  }
};

// Delete working department
export const deleteWorkingDepartment = async (req: Request, res: Response) => {
  const departmentCode = req.params.code;
  const recordCheck = await checkDataExist(WorkingDepartment, { departmentCode });
  if (recordCheck) {
    try {
      await deleteData(res, WorkingDepartment, { departmentCode }, recordCheck.deparmentName, WorkingPosition);
    } catch (error) {
      res.status(400).json({ success: false, error });
    }
  } else {
    res.status(400).json({
      success: false,
      error: "Working department doesn't exist.",
    });
  }
};

// Create working position
export const createWorkingPosition = async (req: Request, res: Response) => {
  const { positionName, departmentCode } = req.body;
  const recordCheck = await checkDataExist(WorkingPosition, { positionName, departmentCode });
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

// Put working position
export const putWorkingPosition = async (req: Request, res: Response) => {
  const { positionName, positionCode } = req.body;
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      const recordCheck = await checkDataExist(WorkingPosition, { positionCode });
      const checkPositionName = await checkDataExist(WorkingPosition, { positionName });
      if (recordCheck) {
        if (!checkPositionName) {
          await updateData(res, WorkingPosition, { positionCode }, { positionName });
        } else {
          res.status(400).json({
            success: false,
            error: `${positionName} already exist.`,
          });
        }
      } else {
        res.status(400).json({
          success: false,
          error: `${positionName} doesn't exist.`,
        });
      }
    } catch (error) {
      res.status(400).json({ success: false, error });
    }
  } else {
    res.status(400).json({ success: false, errors: errors.array() });
  }
};

// Delete working position
export const deleteWorkingPosition = async (req: Request, res: Response) => {
  const positionCode = req.params.code;
  const recordCheck = await checkDataExist(WorkingPosition, { positionCode });
  if (recordCheck) {
    try {
      await deleteData(res, WorkingPosition, { positionCode }, recordCheck.positionName);
    } catch (error) {
      res.status(400).json({ success: false, error });
    }
  } else {
    res.status(400).json({
      success: false,
      error: "Working position doesn't exist.",
    });
  }
};
