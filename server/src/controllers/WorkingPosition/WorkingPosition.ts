import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import {
  checkWorkingDeptExist,
  checkWorkingPosExist,
  createWorkingDept,
  createWorkingPos,
  deleteWorkingDept,
  deleteWorkingPos,
  getWorkingPosition,
  updateWorkingDept,
  updateWorkingPos,
} from './Business';
import { db } from '../../models';

// Get working position
export const getAllWorkingPosition = async (req: Request, res: Response) => {
  try {
    const workingPosition = await getWorkingPosition();
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
  const recordCheck = await checkWorkingDeptExist(departmentName);
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    if (!recordCheck) {
      try {
        const createResponse = await createWorkingDept(departmentName);
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
      const recordCheck = await checkWorkingDeptExist('', departmentCode);
      const checkWorkingDeptName = await checkWorkingDeptExist(departmentName);
      if (recordCheck) {
        if (!checkWorkingDeptName) {
          const updateResponse = await updateWorkingDept(departmentName, departmentCode);
          if (updateResponse[0] === 1) {
            res.status(200).json({ success: true, data: updateResponse[1][0] });
          } else {
            res.status(400).json({ success: false, message: 'Update failed.' });
          }
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
  const recordCheck = await checkWorkingDeptExist('', departmentCode);
  if (recordCheck) {
    try {
      const deleteResponse = await deleteWorkingDept(departmentCode);
      if (
        deleteResponse === 1 ||
        (typeof deleteResponse !== 'number' && deleteResponse?.deptDel === 1 && deleteResponse?.posDel === 0)
      ) {
        res.status(200).json({
          success: true,
          message: `${recordCheck.departmentName} is deleted.`,
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
      error: "Working department doesn't exist.",
    });
  }
};

// Create working position
export const createWorkingPosition = async (req: Request, res: Response) => {
  const posInput = req.body;
  const recordCheck = await checkWorkingPosExist(posInput);
  const checkDept = await checkWorkingDeptExist('', posInput.departmentCode);
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    if (checkDept) {
      if (!recordCheck) {
        try {
          const createResponse = await createWorkingPos(posInput);
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
          error: `${posInput.positionName} already exist.`,
        });
      }
    } else {
      res.status(400).json({
        success: false,
        error: `Working department doesn't exist.`,
      });
    }
  } else {
    res.status(400).json({ success: false, errors: errors.array() });
  }
};

// Put working position
export const putWorkingPosition = async (req: Request, res: Response) => {
  const posInput = req.body;
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      const recordCheck = await checkWorkingPosExist(null, posInput.positionCode);
      const checkPositionName = await db.WorkingPosition.findOne({ where: { positionName: posInput.positionName } });
      if (recordCheck) {
        if (!checkPositionName) {
          const updateResponse = await updateWorkingPos(posInput);
          if (updateResponse[0] === 1) {
            res.status(200).json({ success: true, data: updateResponse[1][0] });
          } else {
            res.status(400).json({ success: false, message: 'Update failed.' });
          }
        } else {
          res.status(400).json({
            success: false,
            error: `${posInput.positionName} already exist.`,
          });
        }
      } else {
        res.status(400).json({
          success: false,
          error: `${posInput.positionName} doesn't exist.`,
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
  const recordCheck = await checkWorkingPosExist(null, positionCode);
  if (recordCheck) {
    try {
      const deleteResponse = await deleteWorkingPos(positionCode);
      if (deleteResponse === 1) {
        res.status(200).json({
          success: true,
          message: `${recordCheck.positionName} is deleted.`,
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
      error: "Working position doesn't exist.",
    });
  }
};
