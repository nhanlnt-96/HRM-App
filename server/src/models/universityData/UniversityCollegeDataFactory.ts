import { Optional, Model, DataTypes, Sequelize, BuildOptions } from 'sequelize';

interface IUniversityDataAttributes {
  name: string;
  code: string;
  location: string;
}

/*
  We have to declare the creation attributes to
  tell Sequelize and TypeScript that the property code,
  in this case, is optional to be passed at creation time
*/
type IUniversityDataCreationAttributes = Optional<IUniversityDataAttributes, 'code'>;

export interface IUniversityDataInstance
  extends Model<IUniversityDataAttributes, IUniversityDataCreationAttributes>,
    IUniversityDataAttributes {}

export type UniversityDataStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IUniversityDataInstance;
};

export const UniversityDataFactory = (sequelize: Sequelize) => {
  return <UniversityDataStatic>sequelize.define<IUniversityDataInstance>('hrm_university_college', {
    code: {
      primaryKey: true,
      unique: true,
      allowNull: false,
      type: DataTypes.STRING,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    location: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  });
};
