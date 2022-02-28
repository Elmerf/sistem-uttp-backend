const config = require('../configs/db.config');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
      host: config.HOST,
      dialect: config.dialect,
      operatorsAliases: false,
      pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle,
      },
    },
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.owners = require('./owner.model')(sequelize, Sequelize);
db.dataUTTPs = require('./data-uttp.model')(sequelize, Sequelize);

db.owners.hasMany(db.dataUTTPs, {
  onDelete: 'CASCADE',
  foreignKey: 'nik_pemilik',
  sourceKey: 'nik',
  as: 'data_uttps',
});
db.dataUTTPs.belongsTo(db.owners, {
  foreignKey: 'nik_pemilik',
  targetKey: 'nik',
  as: 'pemilik',
});

module.exports = db;
