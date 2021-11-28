import { Sequelize } from 'sequelize';
import { WorkingDepartmentFactory } from './position';
import {
  UserAccountFactory,
  UserAccountStatic,
  UserAllowanceFactory,
  UserAllowanceStatic,
  UserCertificationFactory,
  UserCertificationStatic,
  UserContractFactory,
  UserContractStatic,
  UserInfoFactory,
  UserInfoStatic,
  UserPositionFactory,
  UserPositionStatic,
} from './user';
import { WorkingDepartmentStatic, WorkingPositionFactory, WorkingPositionStatic } from './position';
import { UniversityDataFactory, UniversityDataStatic } from './universityData';
import { UserEducationFactory, UserEducationStatic } from './user/UserEducationFactory';

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.ts')[env];

export interface IDb {
  sequelize: Sequelize;
  UserAccount: UserAccountStatic;
  UserInfo: UserInfoStatic;
  UserPosition: UserPositionStatic;
  UserCertification: UserCertificationStatic;
  UserSalaryAllowance: UserAllowanceStatic;
  UserContract: UserContractStatic;
  WorkingDepartment: WorkingDepartmentStatic;
  WorkingPosition: WorkingPositionStatic;
  UniversityData: UniversityDataStatic;
  UserEducation: UserEducationStatic;
}

const sequelize = config.url
  ? new Sequelize(config.url, config)
  : new Sequelize(config.database, config.username, config.password, {
      host: config.host,
      dialect: config.dialect,
      port: config.port,
    });

// Table User
const UserAccount = UserAccountFactory(sequelize);
const UserInfo = UserInfoFactory(sequelize);
const UserPosition = UserPositionFactory(sequelize);
const UserCertification = UserCertificationFactory(sequelize);
const UserSalaryAllowance = UserAllowanceFactory(sequelize);
const UserContract = UserContractFactory(sequelize);
const UserEducation = UserEducationFactory(sequelize);
// Table working position
const WorkingDepartment = WorkingDepartmentFactory(sequelize);
const WorkingPosition = WorkingPositionFactory(sequelize);
// Table university data
const UniversityData = UniversityDataFactory(sequelize);

// Table association
// user
UserAccount.hasOne(UserInfo, {
  foreignKey: 'userId',
  as: 'userInfo',
});
UserAccount.hasMany(UserContract, {
  foreignKey: 'userId',
  as: 'userContracts',
});
UserAccount.hasMany(UserCertification, {
  foreignKey: 'userId',
  as: 'userCertifications',
});
UserAccount.belongsToMany(UniversityData, {
  through: 'hrm_user_education',
  foreignKey: 'userId',
  as: 'userEducations',
});
UniversityData.belongsToMany(UserAccount, {
  through: 'hrm_user_education',
  foreignKey: 'educationCode',
});
UserAccount.hasMany(UserSalaryAllowance, {
  foreignKey: 'userId',
  as: 'userAllowances',
});
// working position
WorkingDepartment.hasMany(WorkingPosition, {
  foreignKey: 'departmentId',
  as: 'workingPositions',
});
WorkingPosition.belongsTo(WorkingDepartment, { foreignKey: 'departmentId', as: 'workingDepartment' });
UserAccount.belongsToMany(WorkingPosition, { through: 'hrm_user_position', foreignKey: 'userId', as: 'userPositions' });
WorkingPosition.belongsToMany(UserAccount, {
  through: 'hrm_user_position',
  foreignKey: 'positionId',
});

export const db: IDb = {
  sequelize,
  UserAccount,
  UserInfo,
  UserPosition,
  UserCertification,
  UserSalaryAllowance,
  UserContract,
  WorkingDepartment,
  WorkingPosition,
  UniversityData,
  UserEducation,
};
