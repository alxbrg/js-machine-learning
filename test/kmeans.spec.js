'use strict';

const {
  Kmeans,
} = require('../src');

const {
  trainingData,
} = require('./fixtures');

describe('kmeans', () => {
  const expected = [
    { x: 14.428571428571429, label: 0 },
    { x: 103, label: 1 },
    { x: 170, label: 2 },
  ];

  it('should work without intialCentroids input', () => {
    const k = new Kmeans({
      K: 3,
      maxIterations: 20,
      key: 'value',
    });

    const { centroids } = k.train(trainingData);

    expect(
      centroids
    ).toEqual(expected);
  });

  it('should work with intialCentroids input', () => {
    const k = new Kmeans({
      K: 3,
      maxIterations: 10,
      key: 'value',
      initialCentroids: [
        { x: 0, label: 0 },
        { x: 100, label: 1 },
        { x: 150, label: 2 },
      ],
    });

    const { centroids } = k.train(trainingData);

    expect(
      centroids
    ).toEqual(expected);
  });
});
