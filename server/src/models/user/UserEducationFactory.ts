import { Optional, Model, DataTypes, Sequelize, BuildOptions } from 'sequelize';
import { IUserEducationAttributes } from './types';
import { convertStringToProperCase } from '../../shared/helper';

type IUserInfoCreationAttributes = Optional<IUserEducationAttributes, 'id'>;

export interface IUserEducationInstance
  extends Model<IUserEducationAttributes, IUserInfoCreationAttributes>,
    IUserEducationAttributes {}

export type UserEducationStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IUserEducationInstance;
};

export const UserEducationFactory = (sequelize: Sequelize) => {
  return <UserEducationStatic>sequelize.define<IUserEducationInstance>(
    'hrm_user_education',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      educationCode: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      majorIn: {
        allowNull: false,
        type: DataTypes.STRING,
        set(value: string) {
          const properCaseValue = convertStringToProperCase(value);
          this.setDataValue('majorIn', properCaseValue);
        },
      },
    },
    { timestamps: false },
  );
};
