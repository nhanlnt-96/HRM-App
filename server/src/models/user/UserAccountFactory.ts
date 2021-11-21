import { Optional, Model, DataTypes, Sequelize, BuildOptions } from 'sequelize';

interface IUserAccountAttributes {
  id: string;
  username: string;
  password: string;
  managerId: string;
  level: number;
  status: number;
  updatedBy: string;
  createdBy: string;
}

type IUserAccountCreationAttributes = Optional<IUserAccountAttributes, 'id'>;

export interface IUserAccountInstance
  extends Model<IUserAccountAttributes, IUserAccountCreationAttributes>,
    IUserAccountAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserAccountStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IUserAccountInstance;
};

export const UserAccountFactory = (sequelize: Sequelize) => {
  return <UserAccountStatic>sequelize.define<IUserAccountInstance>('hrm_user_account', {
    id: {
      allowNull: false,
      primaryKey: true,
      unique: true,
      type: DataTypes.UUID,
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    managerId: {
      allowNull: true,
      type: DataTypes.UUID,
    },
    level: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    status: {
      allowNull: false,
      type: DataTypes.INTEGER,
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
