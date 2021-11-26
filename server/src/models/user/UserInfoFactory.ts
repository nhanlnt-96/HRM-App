import { Optional, Model, DataTypes, Sequelize, BuildOptions } from 'sequelize';
import { IUserInfoAttributes } from './types';

type IUserInfoCreationAttributes = Optional<IUserInfoAttributes, 'id'>;

export interface IUserInfoInstance
  extends Model<IUserInfoAttributes, IUserInfoCreationAttributes>,
    IUserInfoAttributes {}

export type UserInfoStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IUserInfoInstance;
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
        allowNull: false,
        type: DataTypes.TEXT,
      },
      fullName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      dob: {
        allowNull: false,
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
      },
      currentAddress: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      education: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      majorIn: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      salaryRange: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      workPermit: {
        allowNull: true,
        type: DataTypes.BOOLEAN,
      },
    },
    { timestamps: false },
  );
};
