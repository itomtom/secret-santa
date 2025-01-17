import { sequelize } from '../data';
import { DataTypes, Model } from 'sequelize';
import { Participant } from '../participants';

export interface Draw {
  giver: Participant;
  receiver: Participant;
}

interface DrawHistoryAttributes {
  history?: Draw[];
}

class DrawHistory extends Model<DrawHistoryAttributes> implements DrawHistoryAttributes {
  declare history: Draw[];
}

DrawHistory.init(
  {
    history: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'DrawHistory',
  },
);

export default DrawHistory;
