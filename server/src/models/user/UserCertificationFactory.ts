import { Optional, Model, DataTypes, Sequelize, BuildOptions } from 'sequelize';

interface IUserCertificationAttributes {
  id: number;
  userId: string;
  certificationUrl: string;
  description: string;
  updatedBy: string;
  createdBy: string;
}

type IUserCertificationCreationAttributes = Optional<IUserCertificationAttributes, 'id'>;

export interface IUserCertificationInstance
  extends Model<IUserCertificationAttributes, IUserCertificationCreationAttributes>,
    IUserCertificationAttributes {}

export type UserCertificationStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IUserCertificationInstance;
};

export const UserCertificationFactory = (sequelize: Sequelize) => {
  return <UserCertificationStatic>sequelize.define<IUserCertificationInstance>('hrm_user_certification', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: false,
      unique: true,
      type: DataTypes.UUID,
    },
    userId: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    certificationUrl: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT,
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