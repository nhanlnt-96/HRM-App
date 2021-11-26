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
      positionCode: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.UUID,
      },
    },
    { timestamps: false },
  );
};
