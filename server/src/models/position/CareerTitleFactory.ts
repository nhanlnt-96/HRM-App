import { Optional, Model, DataTypes, Sequelize, BuildOptions } from 'sequelize';

interface ICareerTitleAttributes {
  titleCode: number;
  positionCode: string;
  titleName: string;
}

type ICareerTitleCreationAttributes = Optional<ICareerTitleAttributes, 'titleCode'>;

export interface ICareerTitleInstance
  extends Model<ICareerTitleAttributes, ICareerTitleCreationAttributes>,
    ICareerTitleAttributes {}

export type CareerTitleStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ICareerTitleInstance;
};

export const CareerTitleFactory = (sequelize: Sequelize) => {
  return <CareerTitleStatic>sequelize.define<ICareerTitleInstance>('hrm_career_title', {
    titleCode: {
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
    titleName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  });
};
