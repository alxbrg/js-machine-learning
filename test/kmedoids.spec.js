'use strict';

const {
  kmedoids,
} = require('../src');

const {
  trainingData,
} = require('./fixtures');

describe('kmedoids', () => {
  it('should work', () => {
    const K = 3;
    const medoids = kmedoids.train({ key: 'value', data: trainingData }, K);

    const expected = [
      { x: 35, label: 0 },
      { x: 90, label: 1 },
      { x: 150, label: 2 },
    ];

    expect(
      medoids
    ).toEqual(expected);
  });
});
