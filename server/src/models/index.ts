import { WorkingDepartmentFactory } from './position/WorkingDepartmentFactory';
import { Sequelize } from 'sequelize';
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
  UserRoleFactory,
  UserRoleStatic,
} from './user';
import {
  CareerTitleFactory,
  CareerTitleStatic,
  WorkingDepartmentStatic,
  WorkingPositionFactory,
  WorkingPositionStatic,
} from './position';
import { UniversityDataFactory, UniversityDataStatic } from './universityData';

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.ts')[env];

export interface IDb {
  sequelize: Sequelize;
  UserAccount: UserAccountStatic;
  UserInfo: UserInfoStatic;
  UserRole: UserRoleStatic;
  UserCertification: UserCertificationStatic;
  UserSalaryAllowance: UserAllowanceStatic;
  UserContract: UserContractStatic;
  WorkingDepartment: WorkingDepartmentStatic;
  WorkingPosition: WorkingPositionStatic;
  CareerTitle: CareerTitleStatic;
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
const UserRole = UserRoleFactory(sequelize);
const UserCertification = UserCertificationFactory(sequelize);
const UserSalaryAllowance = UserAllowanceFactory(sequelize);
const UserContract = UserContractFactory(sequelize);
// Table association
UserAccount.hasOne(UserInfo, {
  foreignKey: 'userId',
});
UserAccount.hasMany(UserRole, {
  foreignKey: 'userId',
});
UserAccount.hasMany(UserCertification, {
  foreignKey: 'userId',
});
UserAccount.hasMany(UserSalaryAllowance, {
  foreignKey: 'userId',
});
UserAccount.hasMany(UserContract, {
  foreignKey: 'userId',
});

// Table working position
const WorkingDepartment = WorkingDepartmentFactory(sequelize);
const WorkingPosition = WorkingPositionFactory(sequelize);
const CareerTitle = CareerTitleFactory(sequelize);
// Table association
WorkingDepartment.hasMany(WorkingPosition, {
  foreignKey: 'departmentCode',
});
WorkingPosition.hasMany(CareerTitle, {
  foreignKey: 'positionCode',
});

// Table university data
const UniversityData = UniversityDataFactory(sequelize);

export const db: IDb = {
  sequelize,
  UserAccount,
  UserInfo,
  UserRole,
  UserCertification,
  UserSalaryAllowance,
  UserContract,
  WorkingDepartment,
  WorkingPosition,
  CareerTitle,
  UniversityData,
};
