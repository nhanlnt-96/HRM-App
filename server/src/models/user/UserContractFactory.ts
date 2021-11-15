import { Optional, Model, DataTypes, Sequelize, BuildOptions } from 'sequelize';

interface IUserContractAttributes {
  id: string;
  userId: string;
  description: string;
  contractFrom: Date;
  contractTo: Date;
  createdBy: string;
  updatedBy: string;
}

type IUserContractCreationAttributes = Optional<IUserContractAttributes, 'id'>;

export interface IUserContractInstance
  extends Model<IUserContractAttributes, IUserContractCreationAttributes>,
    IUserContractAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserContractStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IUserContractInstance;
};

export const UserContractFactory = (sequelize: Sequelize) => {
  return <UserContractStatic>sequelize.define<IUserContractInstance>('hrm_user_contract', {
    id: {
      allowNull: false,
      primaryKey: true,
      unique: true,
      autoIncrement: false,
      type: DataTypes.UUID,
    },
    userId: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    contractFrom: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    contractTo: {
      allowNull: false,
      type: DataTypes.DATE,
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
