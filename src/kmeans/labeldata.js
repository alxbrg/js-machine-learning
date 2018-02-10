'use strict';

const {
  getDistance,
} = require('../utils');

/**
 * @private assignCluster
 *
 * @param {Object} point
 * @param {Array}  centroids
 *
 * @returns {Object} A point with a cluster label.
 */

function assignCluster (point, centroids) {
  const { label } = centroids.reduce((a, b) => {
    return getDistance(point, a) < getDistance(point, b) ? a : b;
  });

  return { ...point, label };
}

/**
 * @function  labelData
 *
 * @param {*} points
 * @param {*} centroids
 *
 * @returns {Array} An array of clusters.
 */

const labelData = (points, centroids) =>
  points.map(point => assignCluster(point, centroids));

module.exports = {
  labelData,
};
