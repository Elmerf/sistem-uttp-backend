/* eslint-disable camelcase */
const db = require('../models');
const owners = db.owners;

const checkExistingNIK = (req, res, next) => {
  owners.findOne({
    where: {
      nik: req.params.nik,
    },
  }).then((data) => {
    if (!data) {
      res.status(400).send({
        message: 'NIK not found',
      });
      return;
    }
    next();
  });
};

const checkRequiredFields = (req, res, next) => {
  const {lokasi, jenis, tanggal_tera, retribusi} = req.body;

  if (!lokasi || !jenis || !tanggal_tera || !retribusi) {
    res.status(400).send({
      message: 'Missing required fields!',
    });
    return;
  }
  next();
};

module.exports = {
  checkExistingNIK,
  checkRequiredFields,
};
