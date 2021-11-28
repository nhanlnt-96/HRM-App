import { db } from '../../models';
import { convertStringToUnicode } from '../../shared/helper';
import { Op } from 'sequelize';

const {
  UserAccount,
  UserInfo,
  UserSalaryAllowance,
  UserContract,
  UserCertification,
  UserPosition,
  UserEducation,
  WorkingDepartment,
  WorkingPosition,
  UniversityData,
} = db;

export const convertToUsername = (name: string) => {
  let nameConverted = convertStringToUnicode(name).toLowerCase();
  const lastSpaceInName = nameConverted.lastIndexOf(' ');
  const nameOfUser = nameConverted.substring(lastSpaceInName + 1);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  nameConverted = `${nameOfUser}${nameConverted
    .replace(` ${nameOfUser}`, '')
    .match(/\b(\w)/g)
    .join('')}`;
  return nameConverted;
};

export const checkUserExist = async (username: string) => {
  return await UserAccount.findAll({ where: { username: { [Op.like]: `${username}%` } } });
};

export const checkUserCardId = async (cardId: string) => {
  return await UserInfo.findOne({ where: { cardId } });
};

export const checkPhoneNumber = async (phoneNumber: string) => {
  return await UserInfo.findOne({ where: { phoneNumber } });
};

export const createUserFunc = async (body: any) => {
  return await UserAccount.create(body);
};

export const createUserInfoFunc = async (body: any) => {
  return await UserInfo.create(body);
};

export const createUserAllowanceFunc = async (body: any) => {
  return await UserSalaryAllowance.create(body);
};

export const createUserContractFunc = async (body: any) => {
  return await UserContract.create(body);
};

export const createUserCertificationFunc = async (body: any) => {
  return await UserCertification.create(body);
};

export const createUserPositionFunc = async (body: any) => {
  return await UserPosition.create(body);
};

export const createUserEducationFunc = async (body: any) => {
  return await UserEducation.create(body);
};

export const getAllUserFunc = async () => {
  return await UserAccount.findAll({
    include: [
      { model: UserInfo, as: 'userInfo' },
      { model: UserContract, as: 'userContracts' },
      { model: UserCertification, as: 'userCertifications' },
      { model: UniversityData, as: 'userEducations', through: { as: 'userMajorIn' } },
      {
        model: WorkingPosition,
        include: [
          {
            model: WorkingDepartment,
            as: 'workingDepartment',
            attributes: { exclude: ['createdBy', 'updatedBy', 'createdAt', 'updatedAt'] },
          },
        ],
        as: 'userPositions',
        through: { attributes: [] },
      },
      { model: UserSalaryAllowance, as: 'userAllowances' },
    ],
    attributes: { exclude: ['password'] },
  });
};

export const getOneUserFunc = async (id: string) => {
  return await UserAccount.findOne({
    where: { id },
    include: [
      { model: UserInfo, as: 'userInfo' },
      { model: UserContract, as: 'userContracts' },
      { model: UserCertification, as: 'userCertifications' },
      { model: UniversityData, as: 'userEducations', through: { as: 'userMajorIn' } },
      {
        model: WorkingPosition,
        include: [
          {
            model: WorkingDepartment,
            as: 'workingDepartment',
            attributes: { exclude: ['createdBy', 'updatedBy', 'createdAt', 'updatedAt'] },
          },
        ],
        as: 'userPositions',
        through: { attributes: [] },
      },
      { model: UserSalaryAllowance, as: 'userAllowances' },
    ],
    attributes: { exclude: ['password'] },
  });
};
