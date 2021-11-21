import { Optional, Model, DataTypes, Sequelize, BuildOptions } from 'sequelize';

interface IWorkingPositionAttributes {
  positionCode: string;
  positionName: string;
  departmentCode: number;
}

type IWorkingPositionCreationAttributes = Optional<IWorkingPositionAttributes, 'positionCode'>;

export interface IWorkingPositionInstance
  extends Model<IWorkingPositionAttributes, IWorkingPositionCreationAttributes>,
    IWorkingPositionAttributes {}

export type WorkingPositionStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IWorkingPositionInstance;
};

export const WorkingPositionFactory = (sequelize: Sequelize) => {
  return <WorkingPositionStatic>sequelize.define<IWorkingPositionInstance>(
    'hrm_working_position',
    {
      positionCode: {
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      positionName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      departmentCode: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    { timestamps: false },
  );
};
