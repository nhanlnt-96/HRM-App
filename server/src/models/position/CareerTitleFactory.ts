import { Optional, Model, DataTypes, Sequelize, BuildOptions } from 'sequelize';

interface ICareerTitleAttributes {
  id: string;
  positionId: string;
  titleName: string;
  titleCode: string;
}

type ICareerTitleCreationAttributes = Optional<ICareerTitleAttributes, 'id'>;

export interface ICareerTitleInstance
  extends Model<ICareerTitleAttributes, ICareerTitleCreationAttributes>,
    ICareerTitleAttributes {}

export type CareerTitleStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ICareerTitleInstance;
};

export const CareerTitleFactory = (sequelize: Sequelize) => {
  return <CareerTitleStatic>sequelize.define<ICareerTitleInstance>('hrm_career_title', {
    id: {
      allowNull: false,
      primaryKey: true,
      unique: true,
      autoIncrement: false,
      type: DataTypes.UUID,
    },
    positionId: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    titleName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    titleCode: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  });
};
