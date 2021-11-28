import { Optional, Model, DataTypes, Sequelize, BuildOptions } from 'sequelize';
import { hashSync } from 'bcryptjs';
import { IUserAccountAttributes } from './types';

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
      defaultValue: DataTypes.UUIDV4,
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      set(value: string) {
        const hash = hashSync(value, 12);
        this.setDataValue('password', hash);
      },
    },
    managerId: {
      allowNull: true,
      type: DataTypes.UUID,
    },
    level: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: 'user',
    },
    status: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: 'active',
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
