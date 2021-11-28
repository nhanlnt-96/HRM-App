import { Optional, Model, DataTypes, Sequelize, BuildOptions } from 'sequelize';
import { IUserPositionAttributes } from './types';

type IUserRoleCreationAttributes = Optional<IUserPositionAttributes, 'id'>;

export interface IUserPositionInstance
  extends Model<IUserPositionAttributes, IUserRoleCreationAttributes>,
    IUserPositionAttributes {}

export type UserPositionStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IUserPositionInstance;
};

export const UserPositionFactory = (sequelize: Sequelize) => {
  return <UserPositionStatic>sequelize.define<IUserPositionInstance>(
    'hrm_user_position',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      positionId: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      departmentId: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      userId: {
        allowNull: false,
        type: DataTypes.UUID,
      },
    },
    { timestamps: false },
  );
};
