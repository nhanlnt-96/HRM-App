import { Request, Response } from 'express';
import { db } from '../../models';
import { validationResult } from 'express-validator';

const { WorkingDepartment, WorkingPosition, CareerTitle } = db;

interface IWorkingData {
  departmentName?: string;
  departmentCode?: string;
  positionName?: string;
  titleName?: string;
  positionCode?: string;
  titleCode?: string;
}

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

// Check data is exist
const checkDataExist = async (table: any, checkInput: IWorkingData) => {
  return await table.findOne({ where: checkInput });
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
  const { departmentCode, departmentName } = req.body;
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      const recordCheck = await checkDataExist(WorkingDepartment, { departmentCode });
      const departmentNameCheck = await checkDataExist(WorkingDepartment, { departmentName });
      if (recordCheck) {
        if (!departmentNameCheck) {
          const updateResponse = await WorkingDepartment.update(
            { departmentName },
            {
              where: { departmentCode },
              returning: true,
            },
          );
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
          error: "Working department doesn't exist.",
        });
      }
    } catch (error) {
      res.status(400).json({ success: false, error });
    }
  } else {
    res.status(400).json({ success: false, errors: errors.array() });
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
  const { positionCode, positionName, departmentCode } = req.body;
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      const recordCheck = await checkDataExist(WorkingPosition, { positionCode });
      const checkPositionName = await checkDataExist(WorkingPosition, { positionName, departmentCode });
      if (recordCheck) {
        if (!checkPositionName) {
          const updateResponse = await WorkingPosition.update(
            { positionName },
            {
              where: { positionCode },
              returning: true,
            },
          );
          if (updateResponse[0] === 1) {
            res.status(200).json({ success: true, data: updateResponse[1][0] });
          } else {
            res.status(400).json({ success: false, message: 'Update failed.' });
          }
        } else {
          res.status(400).json({
            success: false,
            error: `${positionName} already exist.`,
          });
        }
      } else {
        res.status(400).json({
          success: false,
          error: "Working position doesn't exist.",
        });
      }
    } catch (error) {
      res.status(400).json({ success: false, error });
    }
  } else {
    res.status(400).json({ success: false, errors: errors.array() });
  }
};

// Create career title
export const createCareerTitle = async (req: Request, res: Response) => {
  const { titleName, positionCode } = req.body;
  const recordCheck = await checkDataExist(CareerTitle, { titleName, positionCode });
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

// Put career title
export const putCareerTitle = async (req: Request, res: Response) => {
  const { titleCode, titleName, positionCode } = req.body;
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      const recordCheck = await checkDataExist(CareerTitle, { titleCode });
      const titleNameCheck = await checkDataExist(CareerTitle, { titleName, positionCode });
      if (recordCheck) {
        if (!titleNameCheck) {
          const updateResponse = await CareerTitle.update(
            { titleName },
            {
              where: { titleCode },
              returning: true,
            },
          );
          if (updateResponse[0] === 1) {
            res.status(200).json({ success: true, data: updateResponse[1][0] });
          } else {
            res.status(400).json({ success: false, message: 'Update failed.' });
          }
        } else {
          res.status(400).json({
            success: false,
            error: `${titleName} already exist.`,
          });
        }
      } else {
        res.status(400).json({
          success: false,
          error: "Career title doesn't exist.",
        });
      }
    } catch (error) {
      res.status(400).json({ success: false, error });
    }
  } else {
    res.status(400).json({ success: false, errors: errors.array() });
  }
};
