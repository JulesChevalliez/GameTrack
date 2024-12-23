const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('gametrack', 'juleschevalliez', 'JlsChz98', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432
});

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Connection to the database has been established successfully.');
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error);
    }
};

testConnection();

module.exports = sequelize;