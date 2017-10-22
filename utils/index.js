const bcrypt = require('bcrypt-nodejs');

const isProduction = process.env.NODE_ENV === 'production';
const SALT_FACTOR = 6;


function hash(whatToHash) {
  const salt = bcrypt.genSaltSync(SALT_FACTOR);
  return bcrypt.hashSync(whatToHash, salt);
}

function isValidInput(...input) {
  return input.every(elem => typeof elem === 'string' && elem.length > 30);
}

module.exports = {
  SALT_FACTOR,
  hash,
  bcrypt,
  isValidInput,
  isProduction,
};
