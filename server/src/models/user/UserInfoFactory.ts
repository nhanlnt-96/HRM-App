import { Optional, Model, DataTypes, Sequelize, BuildOptions } from 'sequelize';
import { IUserInfoAttributes } from './types';

type IUserInfoCreationAttributes = Optional<IUserInfoAttributes, 'id'>;

export interface IUserInfoInstance
  extends Model<IUserInfoAttributes, IUserInfoCreationAttributes>,
    IUserInfoAttributes {}

export type UserInfoStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IUserInfoInstance;
};

const convertStringToProperCase = (text: string) => {
  return text.replace(/\w\S*/g, function (str: string) {
    return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
  });
};

export const UserInfoFactory = (sequelize: Sequelize) => {
  return <UserInfoStatic>sequelize.define<IUserInfoInstance>(
    'hrm_user_info',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      avatarUrl: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      fullName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      dob: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      phoneNumber: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      cardId: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      issuedOn: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      issuedAt: {
        allowNull: false,
        type: DataTypes.STRING,
        set(value: string) {
          this.setDataValue('issuedAt', value.toUpperCase());
        },
      },
      currentAddress: {
        allowNull: false,
        type: DataTypes.TEXT,
        set(value: string) {
          const properCaseValue = convertStringToProperCase(value);
          this.setDataValue('currentAddress', properCaseValue);
        },
      },
      education: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      majorIn: {
        allowNull: false,
        type: DataTypes.STRING,
        set(value: string) {
          const properCaseValue = convertStringToProperCase(value);
          this.setDataValue('majorIn', properCaseValue);
        },
      },
      salaryRange: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      workPermit: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    { timestamps: false },
  );
};
