'use strict';

/**
 * Point object
 * @typedef  {Object} Point
 * @property {Number} x
 * @property {Number} y
 *
 */

/**
 * @param    {Point} a
 * @param    {Point} b
 *
 * @returns  {Number} An absolute distance between two points.
 */

function getDistance (a, b) {
  const { x: x1 } = a;
  const { x: x2 } = b;

  return Math.abs(x1 - x2);
};

/**
 * @param   {String} key
 * @param   {Array}  points
 *
 * @returns {Number} Max value.
 */

const getMax = (key, points) =>
  points.reduce((a, b) => Math.max(a[key] || a, b[key] || b));

/**
 * @param   {String} key
 * @param   {Array}  points
 *
 * @returns {Number} Max value.
 */

const getMin = (key, points) =>
  points.reduce((a, b) => Math.min(a[key] || a, b[key] || b));

/**
 * @param   {Number} min min value
 * @param   {Number} max max value
 *
 * @returns {Number} A random float between given min and max values.
 */

module.exports = {
  getDistance,
  getMax,
  getMin,
};
