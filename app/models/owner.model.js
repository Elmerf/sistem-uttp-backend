module.exports = (sequelize, Sequelize) => {
  const Owner = sequelize.define('owner', {
    nama: {
      type: Sequelize.STRING,
    },
    nik: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    jumlah_uttp: {
      type: Sequelize.INTEGER,
    },
  });

  return Owner;
};
