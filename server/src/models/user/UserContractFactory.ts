import { Optional, Model, DataTypes, Sequelize, BuildOptions } from 'sequelize';
import { IUserContractAttributes } from './types';

type IUserContractCreationAttributes = Optional<IUserContractAttributes, 'id'>;

export interface IUserContractInstance
  extends Model<IUserContractAttributes, IUserContractCreationAttributes>,
    IUserContractAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserContractStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IUserContractInstance;
};

export const UserContractFactory = (sequelize: Sequelize) => {
  return <UserContractStatic>sequelize.define<IUserContractInstance>('hrm_user_contract', {
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
    contractDescription: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    contractFrom: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    contractTo: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    createdBy: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: '',
    },
    updatedBy: {
      allowNull: true,
      type: DataTypes.STRING,
    },
  });
};
