import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import {
  checkWorkingDeptExist,
  checkWorkingPosExist,
  convertToCode,
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
  const userInput = req.body;
  // get first each character in string
  userInput.departmentCode = convertToCode(userInput.departmentName);
  const recordCheck = await checkWorkingDeptExist(userInput.departmentName);
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    if (!recordCheck) {
      try {
        const createResponse = await createWorkingDept(userInput);
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
      ApiError(400, `${userInput.departmentName} already exist.`, res);
    }
  } else {
    ApiError(400, errors.array(), res);
  }
};

// Put working department
export const putWorkingDepartment = async (req: Request, res: Response) => {
  const userInput = req.body;
  const id = req.params.code;
  // get first each character in string
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      const recordCheck = await checkWorkingDeptExist('', id);
      const checkWorkingDeptName = await checkWorkingDeptExist(userInput.departmentName);
      if (recordCheck) {
        if (!checkWorkingDeptName) {
          userInput.departmentCode = convertToCode(userInput.departmentName);
          const updateResponse = await updateWorkingDept(userInput, id);
          if (updateResponse[0] === 1) {
            ApiSuccess(200, updateResponse[1][0], res);
          } else {
            ApiError(400, 'Update failed.', res);
          }
        } else {
          ApiError(400, `${userInput.departmentName} already exist.`, res);
        }
      } else {
        ApiError(400, `${userInput.departmentName} doesn't exist.`, res);
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
  const id = req.params.code;
  const recordCheck = await checkWorkingDeptExist('', id);
  if (recordCheck) {
    try {
      const deleteResponse = await deleteWorkingDept(id);
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
  posInput.positionCode = convertToCode(posInput.positionName);
  const recordCheck = await checkWorkingPosExist(posInput);
  const checkDept = await checkWorkingDeptExist('', posInput.departmentId);
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
  const id = req.params.code;
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      const recordCheck = await checkWorkingPosExist(null, id);
      const checkPositionName = await checkWorkingPosExist(posInput);
      if (recordCheck) {
        if (!checkPositionName) {
          posInput.positionCode = convertToCode(posInput.positionName);
          const updateResponse = await updateWorkingPos(posInput, id);
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
  const id = req.params.code;
  const recordCheck = await checkWorkingPosExist(null, id);
  if (recordCheck) {
    try {
      const deleteResponse = await deleteWorkingPos(id);
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
