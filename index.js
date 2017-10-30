const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const compression = require('compression');

require('./services/passport');
const config = require('./config');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoURI, { useMongoClient: true });

const app = express();

app.use(compression());
app.use(morgan('dev'));

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [config.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes')(app);

if (config.NODE_ENV === 'production') {
  const path = require('path');
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send({
      message: 'Api Server Running !'
    });
  });
}

app.listen(config.port, () => {
  console.log(`app listening on port ${config.port}`);
});
