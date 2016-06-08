import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('object-at', 'Integration | Helper | objectAt', {
  integration: true
});

test('arrays of non-objects', function(assert) {
  this.set('array', ['a', 'b']);
  this.set('index', 0);
  this.render(hbs`{{object-at array index}}`);
  assert.equal(
    this.$().text().trim(), 'a', 'simple lookup of element'
  );
  this.set('index', 1);
  assert.equal(
    this.$().text().trim(), 'b', 'observes index'
  );
  this.set('array', ['0', '1']);
  assert.equal(
    this.$().text().trim(), '1', 'observes array'
  );
  Ember.run(() => {
    this.get('array').insertAt(1, '0/1'); // array = ['0', '0/1', '1']
  });
  assert.equal(
    this.$().text().trim(), '0/1', 'observes pushes to array'
  );
  Ember.run(() => {
    this.get('array').removeAt(0); // array = [0/1', '1']
  });
  assert.equal(
    this.$().text().trim(), '1', 'observes removes from array'
  );
});

test('arrays of objects', function(assert) {
  this.set('array', [
    {
      name: 'Edward Snowden',
      profession: 'computer professional'
    },
    {
      name: 'Laura Poitras',
      profession: 'director and producer of documentary films'
    }
  ]);
  this.set('index', 0);
  this.set('key', 'name');
  this.render(hbs`{{object-at array index key}}`);
  assert.equal(
    this.$().text().trim(), 'Edward Snowden', 'simple lookup of object property'
  );
  this.set('index', 1);
  assert.equal(
    this.$().text().trim(), 'Laura Poitras', 'observes index'
  );
  this.set('key', 'profession');
  assert.equal(
    this.$().text().trim(), 'director and producer of documentary films', 'observes key'
  );
  this.set('array', [
    {
      name: 'Chelsea Manning',
      profession: 'soldier'
    },
    {
      name: 'Alexander Nikitin',
      profession: 'nuclear safety inspector'
    }
  ]);
  assert.equal(
    this.$().text().trim(), 'nuclear safety inspector', 'observes array'
  );
  this.set('array.lastObject.profession', 'environmentalist');
  assert.equal(
    this.$().text().trim(), 'environmentalist', 'observes value'
  );
  Ember.run(() => {
    this.get('array').insertAt(1, {
      name: 'Karen Silkwood',
      profession: 'chemical technician'
    });
  });
  assert.equal(
    this.$().text().trim(), 'chemical technician', 'observes pushes to array'
  );
  Ember.run(() => {
    this.get('array').removeAt(0);
  });
  assert.equal(
    this.$().text().trim(), 'environmentalist', 'observes removes from array'
  );
});
