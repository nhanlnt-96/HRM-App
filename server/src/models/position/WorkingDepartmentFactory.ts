import { Optional, Model, DataTypes, Sequelize, BuildOptions } from 'sequelize';

interface IWorkingDepartmentAttributes {
  departmentCode: number;
  departmentName: string;
}

type IWorkingDepartmentCreationAttributes = Optional<IWorkingDepartmentAttributes, 'departmentCode'>;

export interface IWorkingDepartmentInstance
  extends Model<IWorkingDepartmentAttributes, IWorkingDepartmentCreationAttributes>,
    IWorkingDepartmentAttributes {}

export type WorkingDepartmentStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IWorkingDepartmentInstance;
};

export const WorkingDepartmentFactory = (sequelize: Sequelize) => {
  return <WorkingDepartmentStatic>sequelize.define<IWorkingDepartmentInstance>('hrm_working_department', {
    departmentCode: {
      allowNull: false,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    departmentName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  });
};
