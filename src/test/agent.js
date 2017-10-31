const Request = require('../agent');

Request.Circle._getAll()
  .then(res => console.log(res))
  .catch(err => console.log(err));
