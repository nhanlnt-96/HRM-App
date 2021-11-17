import { Optional, Model, DataTypes, Sequelize, BuildOptions } from 'sequelize';

interface IUserRoleAttributes {
  id: string;
  userId: string;
  departmentCode: number;
}

type IUserRoleCreationAttributes = Optional<IUserRoleAttributes, 'id'>;

export interface IUserRoleInstance
  extends Model<IUserRoleAttributes, IUserRoleCreationAttributes>,
    IUserRoleAttributes {}

export type UserRoleStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IUserRoleInstance;
};

export const UserRoleFactory = (sequelize: Sequelize) => {
  return <UserRoleStatic>sequelize.define<IUserRoleInstance>('hrm_user_role', {
    id: {
      allowNull: false,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    departmentCode: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    userId: {
      allowNull: false,
      type: DataTypes.UUID,
    },
  });
};
