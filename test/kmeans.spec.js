'use strict';

const {
  kmeans,
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
    const { centroids } = kmeans.train({ data: trainingData, key: 'value' }, 3);

    expect(
      centroids
    ).toEqual(expected);
  });

  it('should work with intialCentroids input', () => {
    const { centroids } = kmeans.train(
      {
        data: trainingData,
        key: 'value',
        initialCentroids: [
          { x: 0, label: 0 },
          { x: 100, label: 1 },
          { x: 150, label: 2 },
        ],
      },
      3,
    );

    expect(
      centroids
    ).toEqual(expected);
  });
});
