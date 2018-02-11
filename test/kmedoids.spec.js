'use strict';

const {
  kmedoids,
} = require('../src');

const {
  trainingData,
} = require('./fixtures');

describe('build', () => {
  it('should work', () => {
    const K = 3;
    const { medoids } = kmedoids.train({ data: trainingData, key: 'value' }, K);

    const expected = [
      { x: 35, label: 0 },
      { x: 90, label: 1 },
      { x: 112, label: 2 },
    ];

    expect(
      medoids
    ).toEqual(expected);
  });
});
