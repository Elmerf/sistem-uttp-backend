const db = require('../models');
const owners = db.owners;

const checkDuplicateNIK = (req, res, next) => {
  owners.findOne({
    where: {
      nik: req.body.nik,
    },
  }).then((owner) => {
    if (owner) {
      res.status(400).send({
        message: 'Failed! NIK is already in use!',
      });
      return;
    }
    next();
  });
};

const checkRequiredFields = (req, res, next) => {
  if (!req.body.nama || !req.body.nik) {
    res.status(400).send({
      message: 'Missing required fields!',
    });
    return;
  }
  next();
};

module.exports = {
  checkDuplicateNIK,
  checkRequiredFields,
};
