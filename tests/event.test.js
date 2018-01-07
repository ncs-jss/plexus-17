const test = require('tape');
var tapSpec = require('tap-spec');

test
  .createStream()
  .pipe(tapSpec())
  .pipe(process.stdout);

const { list: eventListHandler, get: eventGetHandler } = require('./handlers/event.handler');

test('GET /events', assert => {
  eventListHandler().end((err, { body: eventList }) => {
    assert.notEqual(eventList, [], "List of events shouldn't be empty");
  });

  eventListHandler({
    limit: 2,
    skip: 0,
    fields: 'name,winners'
  }).end((err, { body: eventList }) => {
    eventList.reduce((acc, event) => {
      assert.deepEquals(
        Object.keys(event).sort(),
        ['_id', 'name', 'winners'],
        'eventList should have only _id, name and winners field'
      );
    });
    assert.end();
  });
});
