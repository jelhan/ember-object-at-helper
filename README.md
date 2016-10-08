# ember-object-at-helper [![Build Status](https://travis-ci.org/jelhan/ember-object-at-helper.svg?branch=master)](https://travis-ci.org/jelhan/ember-object-at-helper) [![Code Climate](https://codeclimate.com/github/jelhan/ember-object-at-helper.svg)](https://codeclimate.com/github/jelhan/ember-object-at-helper.js)

HTMLBars template helper to lookup an element of an array.

## Usage
```
Ember.Component.extend({
  whistleblowers: [
    { name: 'Edward Snowden' }
  ],
  directors: ['Laura Poitras'];
  documentaries: [
    { title: 'Citizenfour' }
  ]
  key: 'title'
});
```

Simple examples:
* `{{object-at whistleblowers 0 'name'}}` = Edward Snowden
* `{{object-at directors 0}}` = Laura Poitras

Complex example:
```
{{#each whistleblowers as |whistleblower index|}}
  {{object-at directors index}} produced the great documentary
  {{object-at documentaries index key}} about {{whistleblower.name}}.
{{/each}}
```

## Installation

* `ember install ember-object-at-helper`

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`

## See also

[ember-composable-helpers](https://github.com/DockYard/ember-composable-helpers) also includes an [`object-at` template helper](https://github.com/DockYard/ember-composable-helpers#object-at).
