import { Optional, Model, DataTypes, Sequelize, BuildOptions } from 'sequelize';
import { IWorkingDepartmentAttributes } from './types';

type IWorkingDepartmentCreationAttributes = Optional<IWorkingDepartmentAttributes, 'id'>;

export interface IWorkingDepartmentInstance
  extends Model<IWorkingDepartmentAttributes, IWorkingDepartmentCreationAttributes>,
    IWorkingDepartmentAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

export type WorkingDepartmentStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IWorkingDepartmentInstance;
};

export const WorkingDepartmentFactory = (sequelize: Sequelize) => {
  return <WorkingDepartmentStatic>sequelize.define<IWorkingDepartmentInstance>('hrm_working_department', {
    id: {
      primaryKey: true,
      unique: true,
      autoIncrement: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    departmentCode: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    departmentName: {
      allowNull: false,
      type: DataTypes.STRING,
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
