module.exports = (sequelize, Sequelize) => {
  const Owner = sequelize.define('owner', {
    nama: {
      type: Sequelize.STRING,
    },
    nik: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    jumlah_uttp: {
      type: Sequelize.INTEGER,
    },
  });

  return Owner;
};
