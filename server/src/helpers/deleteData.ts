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
};
