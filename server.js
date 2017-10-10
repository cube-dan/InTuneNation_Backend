// reading environmental variable
if (process.envNODE_ENV !== 'production') {
  require('dotenv').config();
}
const session = require('express-session')
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const app = express();
const user = require('./routes/users');
const exercises = require('./routes/exercises');
const scores = require('./routes/scores');

const { googleRouter } = require('./config/passport.js');

app.disable('x-powered-by');

if (app.get('env') === 'development') {
  app.use(morgan('dev'));
}

app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

const { middlewareVerify } = require('./middlewares/verifications.js');

// this apply the middlewares;
app.use('/users', middlewareVerify);

// this doesn't apply the middlewares;
app.use(googleRouter);
app.use(user);
app.use(exercises);
app.use(scores);

app.use((_req, res) => {
  res.sendStatus(404);
});

app.use((err, _req, res, _next) => {
  if (err.status) {
    return res.status(err.status).set('Content-Type', 'text/plain').send(err.message);
  }
  console.error(err.stack);
  res.sendStatus(500);
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  if (app.get('env') !== 'test') {
    console.log('Listening on port', port);
  }
});

module.exports = app;
