'use strict';

const {
  Kmeans,
} = require('../src');

const {
  kmeansDataSet,
} = require('./fixtures');

describe('kmeans', () => {
  it('should work', () => {
    const k = new Kmeans({
      K: 3,
      maxIterations: 10,
      key: 'value',
    });

    const { centroids } = k.train(kmeansDataSet);

    expect(
      centroids
    ).toEqual([
      { x: 14.428571428571429, label: 0 },
      { x: 103, label: 1 },
      { x: 170, label: 2 },
    ]);
  });
});
