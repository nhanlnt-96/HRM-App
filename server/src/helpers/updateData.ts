import { Response } from 'express';

export const updateData = async (res: Response, table: any, updateCondition: any, updateInput: any) => {
  const updateResponse = await table.update(updateInput, { where: updateCondition, returning: true });
  if (updateResponse[0] === 1) {
    res.status(200).json({ success: true, data: updateResponse[1][0] });
  } else {
    res.status(400).json({ success: false, message: 'Update failed.' });
  }
};
