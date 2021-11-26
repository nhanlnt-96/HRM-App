import { db } from '../../models';
import { IWorkingDepartmentAttributes, IWorkingPositionAttributes } from '../../models/position';

const { WorkingDepartment, WorkingPosition } = db;

export const convertToCode = (text: string) => {
  text = text.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
  text = text.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
  text = text.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
  text = text.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
  text = text.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
  text = text.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
  text = text.replace(/đ/gi, 'd');
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  text = text
    .match(/\b(\w)/g)
    .join('')
    .toUpperCase();

  return text;
};

export const checkWorkingDeptExist = async (departmentName: string, id?: string) => {
  return id
    ? await WorkingDepartment.findOne({ where: { id } })
    : await WorkingDepartment.findOne({ where: { departmentName } });
};

export const getWorkingPosition = async () => {
  return await WorkingDepartment.findAll({
    include: [WorkingPosition],
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
  const checkDeptChild = await WorkingPosition.findOne({ where: { id } });
  if (checkDeptChild) {
    const deptDel = await WorkingDepartment.destroy({ where: { id } });
    const posDel = await WorkingPosition.destroy({ where: { departmentId: id } });
    return { deptDel, posDel };
  } else {
    return await WorkingDepartment.destroy({ where: { id } });
  }
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

export const deleteWorkingPos = async (positionCode: string | number) => {
  return await WorkingPosition.destroy({ where: { positionCode } });
};
