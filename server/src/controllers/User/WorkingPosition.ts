import { Request, Response } from 'express';
import { db } from '../../models';

const { WorkingPosition, CareerTitle } = db;

// Get working position
export const getAllWorkingPosition = async (req: Request, res: Response) => {
  try {
    const workingPosition = await WorkingPosition.findAll({
      include: [CareerTitle],
      order: [['positionCode', 'ASC']],
    });
    res.status(200).json({
      success: true,
      data: workingPosition,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};
