'use strict';

const {
  getDistance,
  getMax,
  getMin,
  getRandomFloat,
} = require('../src/utils');

describe('utils/getMax', () => {
  it('should return the greatest value for a specific key in an array of objects', () => {
    const set = [ { x: 1 }, { x: 2 }, { x: 3 } ];
    expect(getMax('x', set)).toEqual(3);
  });
});

describe('utils/getMin', () => {
  it('should return the lowest value for a specific key in an array of objects', () => {
    const set = [ { x: 1 }, { x: 2 }, { x: 3 } ];
    expect(getMin('x', set)).toEqual(1);
  });
});
