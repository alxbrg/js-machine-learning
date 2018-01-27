'use strict';

const {
  Kmeans,
} = require('../src');

const {
  kmeansDataSet,
} = require('./fixtures');

describe('kmeans', () => {
  it('should work', () => {
    const k = new Kmeans({ K: 3, iterations: 10, key: 'value' });

    k.train(kmeansDataSet);

    expect(k.label([ { x: 2 } ])).toEqual([ { x: 2, label: 0 } ]);
    expect(k.label([ { x: 100 } ])).toEqual([ { x: 100, label: 1 } ]);
    expect(k.label([ { x: 150 } ])).toEqual([ { x: 150, label: 2 } ]);
  });
});
