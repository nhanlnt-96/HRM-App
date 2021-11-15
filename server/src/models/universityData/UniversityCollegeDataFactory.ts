import { Optional, Model, DataTypes, Sequelize, BuildOptions } from 'sequelize';

interface IUniversityDataAttributes {
  id: string;
  name: string;
  code: string;
  location: string;
}

type IUniversityDataCreationAttributes = Optional<IUniversityDataAttributes, 'id'>;

export interface IUniversityDataInstance
  extends Model<IUniversityDataAttributes, IUniversityDataCreationAttributes>,
    IUniversityDataAttributes {}

export type UniversityDataStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IUniversityDataInstance;
};

export const UniversityDataFactory = (sequelize: Sequelize) => {
  return <UniversityDataStatic>sequelize.define<IUniversityDataInstance>('hrm_university_college', {
    id: {
      allowNull: false,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    code: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    location: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  });
};
