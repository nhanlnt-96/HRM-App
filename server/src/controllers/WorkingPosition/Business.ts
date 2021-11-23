import { db } from '../../models';

interface IWorkingPosition {
  positionName: string;
  departmentCode: number;
}

const { WorkingDepartment, WorkingPosition,UserAccount } = db;

export const checkWorkingDeptExist = async (departmentName: string, departmentCode?: number | string) => {
  return departmentCode
    ? await WorkingDepartment.findOne({ where: { departmentCode } })
    : await WorkingDepartment.findOne({ where: { departmentName } });
};

export const getWorkingPosition = async () => {
  return await WorkingDepartment.findAll({
    include: [WorkingPosition],
    order: [['departmentCode', 'ASC']],
  });
};

export const createWorkingDept = async (departmentName: string) => {
  return await WorkingDepartment.create({ departmentName });
};

export const updateWorkingDept = async (departmentName: string, departmentCode: number) => {
  return await WorkingDepartment.update({ departmentName }, { where: { departmentCode }, returning: true });
};

export const deleteWorkingDept = async (departmentCode: string | number) => {
  const checkDeptChild = await WorkingPosition.findOne({ where: { departmentCode } });
  if (checkDeptChild) {
    const deptDel = await WorkingDepartment.destroy({ where: { departmentCode } });
    const posDel = await WorkingPosition.destroy({ where: { departmentCode } });
    return { deptDel, posDel };
  } else {
    return await WorkingDepartment.destroy({ where: { departmentCode } });
  }
};

export const checkWorkingPosExist = async (body: any, positionCode?: number | string) => {
  return positionCode
    ? await WorkingPosition.findOne({ where: { positionCode } })
    : await WorkingPosition.findOne({ where: body });
};

export const createWorkingPos = async (body: IWorkingPosition) => {
  return await WorkingPosition.create(body);
};

export const updateWorkingPos = async (body: IWorkingPosition) => {
  return await WorkingPosition.update(
    { positionName: body.positionName },
    { where: { departmentCode: body.departmentCode }, returning: true },
  );
};

export const deleteWorkingPos = async (positionCode: string | number) => {
  return await WorkingPosition.destroy({ where: { positionCode } });
};
