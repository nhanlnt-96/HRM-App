import { Response } from 'express';

export const updateData = async (res: Response, table: any, updateCondition: any, updateInput: any) => {
  const updateResponse = await table.update(updateInput, { where: updateCondition, returning: true });
};
