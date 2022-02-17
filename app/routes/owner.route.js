/* eslint-disable new-cap */
const {verifyOwners} = require('../middleware');

module.exports = (app) => {
  const owners = require('../controllers/owner.controller');
  const router = require('express').Router();

  router.post('/', [
    verifyOwners.checkRequiredFields,
    verifyOwners.checkDuplicateNIK,
  ], owners.create);
  router.get('/', owners.findAll);
  router.get('/:nik', owners.findOne);
  router.put('/:nik', owners.update);
  router.delete('/:nik', owners.delete);

  app.use('/api/owners/', router);
};
