import { sequelize } from '../data';
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

class Participant extends Model<
  InferAttributes<Participant>,
  InferCreationAttributes<Participant>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare blacklist?: number[];
}

Participant.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    blacklist: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Participant',
  },
);

export default Participant;
