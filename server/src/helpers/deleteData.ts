import { Response } from 'express';

export const deleteData = async (
  res: Response,
  table: any,
  deleteCondition: any,
  dataName: string,
  associateTable?: any,
) => {
  let deleteResponse = 0;
  if (associateTable) {
    deleteResponse = await table.destroy({ where: deleteCondition }).then(async () => {
      return await associateTable.destroy({ where: deleteCondition });
    });
  } else {
    deleteResponse = await table.destroy({ where: deleteCondition });
  }
  if (deleteResponse === 1) {
    res.status(200).json({
      success: true,
      message: `${dataName} is deleted.`,
    });
  } else {
    res.status(400).json({ success: false, message: 'Delete failed.' });
  }
};
