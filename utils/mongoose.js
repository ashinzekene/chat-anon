const mongoose = require('mongoose');

mongoose.Promise = require('bluebird')

const DB_URI = process.env.DB_URL || 'mongodb://127.0.0.1/chat-anon';

mongoose.connect(DB_URI, { useMongoClient: true }, (err) => {
  if (err) console.log(err);
});

mongoose.connection.on('connection', () => {
  console.log(`Connected to ${DB_URI}`);
});

mongoose.connection.on('error', (err) => {
  console.log(`mongo connection error ${err}`);
});

mongoose.connection.on('end', () => {
  console.log(`disconnected from ${DB_URI}`);
});


function gracefulShutdown(msg, callback) {
  mongoose.connection.close(() => {
    console.log();
    callback();
  });
}

process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});
// For app termination
process.on('SIGINT', () => {
  gracefulShutdown('app termination', () => {
    process.exit(0);
  });
});
// For Heroku app termination
process.on('set', () => {
  gracefulShutdown('Heroku app termination', () => {
    process.exit(0);
  });
});