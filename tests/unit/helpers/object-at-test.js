import objectAt from 'dummy/helpers/object-at';
import { module, test } from 'qunit';

module('Unit | Helper | object at');

test('it works', function(assert) {
  assert.expect(4);

  let element = {
    property: 'test'
  };
  let array = [element];
  assert.ok(
    objectAt.create().compute([array, 0]) === element,
    'returns element if it exist'
  );
  assert.ok(
    objectAt.create().compute([array, 0, 'property']) === 'test',
    'returns value if element exists and key is defined'
  );

  assert.ok(
    objectAt.create().compute([array, 1]) === undefined,
    'returns undefined if element does not exist in array'
  );

  assert.ok(
    objectAt.create().compute([array, 0, 'not-existing']) === undefined,
    'returns undefined if property does not exist in object'
  );
});
