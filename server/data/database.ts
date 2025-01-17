import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');

export const initDatabase = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default sequelize;
