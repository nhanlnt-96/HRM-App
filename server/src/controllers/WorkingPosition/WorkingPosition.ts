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
import { ApiError, ApiSuccess } from '../../shared/helper';

// Get working position
export const getAllWorkingPosition = async (req: Request, res: Response) => {
  try {
    const workingPosition = await getWorkingPosition();
    ApiSuccess(200, workingPosition, res);
  } catch (error) {
    ApiError(400, error, res);
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
        ApiSuccess(
          201,
          {
            message: `${createResponse.departmentName} is created.`,
            data: createResponse,
          },
          res,
        );
      } catch (error) {
        ApiError(400, error, res);
      }
    } else {
      ApiError(400, `${departmentName} already exist.`, res);
    }
  } else {
    ApiError(400, errors.array(), res);
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
            ApiSuccess(200, updateResponse[1][0], res);
          } else {
            ApiError(400, 'Update failed.', res);
          }
        } else {
          ApiError(400, `${departmentName} already exist.`, res);
        }
      } else {
        ApiError(400, `${departmentName} doesn't exist.`, res);
      }
    } catch (error) {
      ApiError(400, error, res);
    }
  } else {
    ApiError(400, errors.array(), res);
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
        ApiSuccess(200, `${recordCheck.departmentName} is deleted.`, res);
      } else {
        ApiError(400, 'Delete failed.', res);
      }
    } catch (error) {
      ApiError(400, error, res);
    }
  } else {
    ApiError(400, "Working department doesn't exist.", res);
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
          ApiSuccess(
            201,
            {
              message: `${createResponse.positionName} is created.`,
              data: createResponse,
            },
            res,
          );
        } catch (error) {
          ApiError(400, error, res);
        }
      } else {
        ApiError(400, `${posInput.positionName} already exist.`, res);
      }
    } else {
      ApiError(400, "Working department doesn't exist.", res);
    }
  } else {
    ApiError(400, errors.array(), res);
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
            ApiSuccess(200, updateResponse[1][0], res);
          } else {
            ApiError(400, 'Update failed.', res);
          }
        } else {
          ApiError(400, `${posInput.positionName} already exist.`, res);
        }
      } else {
        ApiError(400, `${posInput.positionName} doesn't exist.`, res);
      }
    } catch (error) {
      ApiError(400, error, res);
    }
  } else {
    ApiError(400, errors.array(), res);
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
        ApiSuccess(200, `${recordCheck.positionName} is deleted.`, res);
      } else {
        ApiError(400, 'Delete failed.', res);
      }
    } catch (error) {
      ApiError(400, error, res);
    }
  } else {
    ApiError(400, "Working position doesn't exist.", res);
  }
};
