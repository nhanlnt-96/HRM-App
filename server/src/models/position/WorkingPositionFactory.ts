import { Optional, Model, DataTypes, Sequelize, BuildOptions } from 'sequelize';

interface IWorkingPositionAttributes {
  id: string;
  positionName: string;
  positionCode: string;
}

type IWorkingPositionCreationAttributes = Optional<IWorkingPositionAttributes, 'id'>;

export interface IWorkingPositionInstance
  extends Model<IWorkingPositionAttributes, IWorkingPositionCreationAttributes>,
    IWorkingPositionAttributes {}

export type WorkingPositionStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IWorkingPositionInstance;
};

export const WorkingPositionFactory = (sequelize: Sequelize) => {
  return <WorkingPositionStatic>sequelize.define<IWorkingPositionInstance>('hrm_working_position', {
    id: {
      allowNull: false,
      primaryKey: true,
      unique: true,
      autoIncrement: false,
      type: DataTypes.UUID,
    },
    positionName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    positionCode: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  });
};
