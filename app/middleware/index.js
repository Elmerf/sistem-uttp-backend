const verifyOwners = require('./verifyCreateOwners');
const verifyDataUTTPs = require('./verifyCreateDataUTTPs');
const authJwt = require('./authJwt');

module.exports = {
  verifyOwners,
  verifyDataUTTPs,
  authJwt,
};
