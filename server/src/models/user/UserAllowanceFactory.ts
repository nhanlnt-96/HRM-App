import { Optional, Model, DataTypes, Sequelize, BuildOptions } from 'sequelize';

interface IUserAllowanceAttributes {
  id: string;
  userId: string;
  allowance: number;
  description: string;
  updatedBy: string;
  createdBy: string;
}

type IUserAllowanceCreationAttributes = Optional<IUserAllowanceAttributes, 'id'>;

export interface IUserAllowanceInstance
  extends Model<IUserAllowanceAttributes, IUserAllowanceCreationAttributes>,
    IUserAllowanceAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserAllowanceStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IUserAllowanceInstance;
};

export const UserAllowanceFactory = (sequelize: Sequelize) => {
  return <UserAllowanceStatic>sequelize.define<IUserAllowanceInstance>('hrm_user_salary_allowance', {
    id: {
      allowNull: false,
      primaryKey: true,
      unique: true,
      autoIncrement: false,
      type: DataTypes.UUID,
    },
    userId: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    allowance: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    createdBy: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    updatedBy: {
      allowNull: true,
      type: DataTypes.STRING,
    },
  });
};