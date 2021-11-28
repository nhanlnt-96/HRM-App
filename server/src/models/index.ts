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
// Table association
UserAccount.hasOne(UserInfo, {
  foreignKey: 'userId',
  as: 'userInfo',
});
UserAccount.hasMany(UserPosition, {
  foreignKey: 'userId',
});
UserAccount.hasMany(UserCertification, {
  foreignKey: 'userId',
  as: 'userCertifications',
});
UserAccount.hasMany(UserSalaryAllowance, {
  foreignKey: 'userId',
  as: 'userAllowances',
});
UserAccount.hasMany(UserContract, {
  foreignKey: 'userId',
  as: 'userContracts',
});

// Table working position
const WorkingDepartment = WorkingDepartmentFactory(sequelize);
const WorkingPosition = WorkingPositionFactory(sequelize);
// Table association
WorkingDepartment.hasMany(WorkingPosition, {
  as: 'workingPositions',
  foreignKey: 'departmentId',
});
UserAccount.belongsToMany(WorkingPosition, { through: 'hrm_user_position', foreignKey: 'userId', as: 'userPositions' });
UserAccount.belongsToMany(WorkingDepartment, {
  through: 'hrm_user_position',
  foreignKey: 'userId',
  as: 'userDepartment',
});
WorkingPosition.belongsToMany(UserAccount, {
  through: 'hrm_user_position',
  foreignKey: 'positionId',
});
WorkingDepartment.belongsToMany(UserAccount, {
  through: 'hrm_user_position',
  foreignKey: 'departmentId',
});

// Table university data
const UniversityData = UniversityDataFactory(sequelize);

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
};
