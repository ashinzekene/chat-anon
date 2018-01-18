const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const routes = require('./newroutes');
const { isProduction } = require('./utils');
require('./utils/mongoose');


const port = process.env.PORT || 4300;
const app = express();

if (!isProduction) {
  app.use(morgan('dev'));
}

app.use(cors({origin: "https://ashinzekene.github.io"}))
app.use((req, res, next) => {
  res.setHeader("x-powered-by", "Chat-anon")
  next()
})
app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// eslint-disable-next-line
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = req.app.get('env') === 'development' ? err.message : 'There are no houses here';
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  console.log(err);
  console.log(req.url);
  res.json({ result: err });
});


module.exports = app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Listening on %s ', port);
});
