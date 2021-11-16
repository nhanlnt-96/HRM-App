import { Optional, Model, DataTypes, Sequelize, BuildOptions } from 'sequelize';

interface IWorkingPositionAttributes {
  positionName: string;
  positionCode: string;
}

type IWorkingPositionCreationAttributes = Optional<IWorkingPositionAttributes, 'positionCode'>;

export interface IWorkingPositionInstance
  extends Model<IWorkingPositionAttributes, IWorkingPositionCreationAttributes>,
    IWorkingPositionAttributes {}

export type WorkingPositionStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IWorkingPositionInstance;
};

export const WorkingPositionFactory = (sequelize: Sequelize) => {
  return <WorkingPositionStatic>sequelize.define<IWorkingPositionInstance>('hrm_working_position', {
    positionName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    positionCode: {
      primaryKey: true,
      unique: true,
      allowNull: false,
      type: DataTypes.STRING,
    },
  });
};
