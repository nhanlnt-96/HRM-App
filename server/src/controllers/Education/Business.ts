import { db } from '../../models';

export interface IEducationData {
  name: string;
  code: string;
  location: string;
}

const { UniversityData } = db;

export const checkEducationExist = async (body: IEducationData) => {
  return await UniversityData.findOne({ where: { name: body.name } });
};

export const getEducation = async () => {
  return await UniversityData.findAll({ order: [['code', 'ASC']] });
};

export const createEducation = async (body: IEducationData) => {
  return await UniversityData.create(body);
};

export const createMultiEducation = async (body: IEducationData[]) => {
  return body.map(async (val: IEducationData) => {
    await UniversityData.create({
      name: val?.name.trim(),
      code: val.code.trim(),
      location: val?.location.trim(),
    });
  });
};

export const updateEducation = async (body: IEducationData) => {
  const { name, code, location } = body;
  return await UniversityData.update({ name, location }, { where: { code }, returning: true });
};
