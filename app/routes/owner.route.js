/* eslint-disable new-cap */
const {verifyOwners, authJwt} = require('../middleware');

module.exports = (app) => {
  const owners = require('../controllers/owner.controller');
  const router = require('express').Router();

  router.use(function(req, res, next) {
    res.header(
        'Access-Control-Allow-Headers',
        'x-access-token, Origin, Content-Type, Accept',
    );
    next();
  });
  router.post('/', [
    verifyOwners.checkRequiredFields,
    verifyOwners.checkDuplicateNIK,
  ], owners.create);
  router.get('/', owners.findAll);
  router.get('/:nik', owners.findOne);
  router.put('/:nik', owners.update);
  router.delete('/:nik', owners.delete);

  app.use('/api/owners/', authJwt.verifyToken, router);
};
