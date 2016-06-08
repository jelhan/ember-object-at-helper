import Ember from 'ember';

const {
  assert,
  get,
  isArray,
  isPresent,
  setProperties,
  typeOf
} = Ember;

function isInteger(value) {
  if (typeOf(Number.isInteger) === 'function') {
    return Number.isInteger(value);
  } else {
    return typeOf(value) === 'number' && value % 1 === 0;
  }
}

export default Ember.Helper.extend({
  compute([array, index, key]) {
    assert(
      'first argument must be an array',
      isArray(array)
    );
    assert(
      'second argument must be a positive integer representing index in array',
      isInteger(index) && index >= 0
    );
    assert(
      'third argument must be undefine or a non empty string',
      key === undefined || (typeOf(key) === 'string' && isPresent(key))
    );

    let lastKey = this.get('key');
    let element;

    if (typeOf(array.objectAt) !== 'function') {
      array = Ember.A(array);
    }

    setProperties(this, {
      array,
      key
    });

    if (isPresent(lastKey)) {
      this.removeObserver(`array.@each.${lastKey}`, this, 'recompute');
    } else {
      this.removeObserver(`array.[]`, this, 'recompute');
    }
    if (isPresent(key)) {
      this.addObserver(`array.@each.${key}`, this, 'recompute');
    } else {
      this.addObserver(`array.[]`, this, 'recompute');
    }

    element = array.objectAt(index);
    if (element) {
      return isPresent(key) ? get(element, key) : element;
    }
    return;
  },
  array: undefined,
  key: undefined
});
