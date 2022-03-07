module.exports = (sequelize, Sequelize) => {
  const Owner = sequelize.define('user', {
    username: {
      type: Sequelize.STRING,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
    },
  });

  return Owner;
};
