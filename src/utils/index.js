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

const getDistance = (a, b) => Math.abs(a.x - b.x);

/**
 * @param   {String} key
 * @param   {Array}  points
 *
 * @returns {Number} Max value.
 */

const getMax = (key, points) =>
  points.reduce((a, b) => Math.max(
    a[key] === undefined ? a : a[key],
    b[key] === undefined ? b : b[key]
  ));

/**
 * @param   {String} key
 * @param   {Array}  points
 *
 * @returns {Number} Max value.
 */

const getMin = (key, points) =>
  points.reduce((a, b) => Math.min(
    a[key] === undefined ? a : a[key],
    b[key] === undefined ? b : b[key]
  ));
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
