const test = require('tape');
var tapSpec = require('tap-spec');

test
  .createStream()
  .pipe(tapSpec())
  .pipe(process.stdout);

require('./user.test')(test);
require('./event.test')(test);
