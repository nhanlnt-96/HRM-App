import { db } from '../../models';
import { IWorkingDepartmentAttributes, IWorkingPositionAttributes } from '../../models/position';
import { convertString } from '../../shared/helper';

const { WorkingDepartment, WorkingPosition } = db;

export const convertToCode = (text: string) => {
  let stringConverted = convertString(text);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  stringConverted = stringConverted
    .match(/\b(\w)/g)
    .join('')
    .toUpperCase();

  return stringConverted;
};

export const checkWorkingDeptExist = async (departmentName: string, id?: string) => {
  return id
    ? await WorkingDepartment.findOne({ where: { id } })
    : await WorkingDepartment.findOne({ where: { departmentName } });
};

export const getWorkingPosition = async () => {
  return await WorkingDepartment.findAll({
    include: [{ model: WorkingPosition, as: 'workingPositions' }],
    order: [['departmentCode', 'ASC']],
  });
};

export const createWorkingDept = async (body: IWorkingDepartmentAttributes) => {
  return await WorkingDepartment.create(body);
};

export const updateWorkingDept = async (body: IWorkingDepartmentAttributes, id: string) => {
  return await WorkingDepartment.update(body, { where: { id }, returning: true });
};

export const deleteWorkingDept = async (id: string) => {
  return await WorkingDepartment.destroy({ where: { id } });
};

export const checkWorkingPosExist = async (body: any, id?: string) => {
  return id ? await WorkingPosition.findOne({ where: { id } }) : await WorkingPosition.findOne({ where: body });
};

export const createWorkingPos = async (body: IWorkingPositionAttributes) => {
  return await WorkingPosition.create(body);
};

export const updateWorkingPos = async (body: IWorkingPositionAttributes, id: string) => {
  return await WorkingPosition.update(body, { where: { id }, returning: true });
};

export const deleteWorkingPos = async (id: string) => {
  return await WorkingPosition.destroy({ where: { id } });
};
