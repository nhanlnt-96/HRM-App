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
} from './user';
import { CareerTitleFactory, CareerTitleStatic, WorkingPositionFactory, WorkingPositionStatic } from './position';
import { UniversityDataFactory, UniversityDataStatic } from './universityData';

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.ts')[env];

export interface IDb {
  sequelize: Sequelize;
  UserAccount: UserAccountStatic;
  UserCertification: UserCertificationStatic;
  UserInfo: UserInfoStatic;
  UserSalaryAllowance: UserAllowanceStatic;
  UserContract: UserContractStatic;
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
const UserCertification = UserCertificationFactory(sequelize);
const UserInfo = UserInfoFactory(sequelize);
const UserSalaryAllowance = UserAllowanceFactory(sequelize);
const UserContract = UserContractFactory(sequelize);
// Table association
UserAccount.hasMany(UserCertification, {
  foreignKey: 'userId',
});
UserAccount.hasOne(UserInfo, {
  foreignKey: 'userId',
});
UserAccount.hasMany(UserSalaryAllowance, {
  foreignKey: 'userId',
});
UserAccount.hasMany(UserContract, {
  foreignKey: 'userId',
});

// Table working position
const WorkingPosition = WorkingPositionFactory(sequelize);
const CareerTitle = CareerTitleFactory(sequelize);
// Table association
WorkingPosition.hasMany(CareerTitle, {
  foreignKey: 'positionId',
});

// Table university data
const UniversityData = UniversityDataFactory(sequelize);

export const db: IDb = {
  sequelize,
  UserAccount,
  UserCertification,
  UserInfo,
  UserSalaryAllowance,
  UserContract,
  WorkingPosition,
  CareerTitle,
  UniversityData,
};
