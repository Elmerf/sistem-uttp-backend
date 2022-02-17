module.exports = (sequelize, Sequelize) => {
  const DataUTTP = sequelize.define('data_uttp', {
    kode_uttp: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: false,
    },
    lokasi: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    jenis: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    tanggal_tera: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    retribusi: {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: false,
    },
    keterangan: {
      type: Sequelize.TEXT,
    },
  });

  return DataUTTP;
};
