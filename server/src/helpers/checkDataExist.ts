export const checkDataExist = async (table: any, checkInput: any) => {
  return await table.findOne({ where: checkInput });
};
