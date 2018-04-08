// const sendmail = require('sendmail')({
//   logger: {
//     debug: console.log,
//     info: console.info,
//     warn: console.warn,
//     error: console.error
//   },
//   silent: false,
//   devPort: 1025, // Default: False
//   devHost: 'localhost', // Default: localhost
//   smtpPort: 2525, // Default: 25
//   smtpHost: 'localhost' // Default: -1 - extra smtp host after resolveMX
// })
const sendmail = require("sendmail")()

function send(to, subject, html, from = null) {
  sendmail({
    from: 'ashinzekene@nlyvn.com',
    to: to || 'ashinzekene@gmail.com',
    subject: subject || 'test sendmail',
    html: html || 'Mail of test sendmail ',
  }, function(err, reply) {
    console.log(err && err.stack);
    console.dir(reply);
  });
}

module.export = send

send()