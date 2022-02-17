/* eslint-disable camelcase */
/* eslint-disable new-cap */
const {verifyDataUTTPs} = require('../middleware');

module.exports = (app) => {
  const data_uttps = require('../controllers/data-uttp.controller');
  const router = require('express').Router();

  router.post('/:nik', [
    verifyDataUTTPs.checkRequiredFields,
    verifyDataUTTPs.checkExistingNIK,
  ], data_uttps.create);
  router.get('/', data_uttps.findAll);
  router.get('/:nik', data_uttps.findOne);
  router.put('/:kode_uttp', data_uttps.update);
  router.delete('/:kode_uttp', data_uttps.delete);

  app.use('/api/data-uttps/', router);
};
