'use strict';

const {
  getDistance,
} = require('../utils');

/**
 * @private assignCluster
 *
 * @param {Object} point
 * @param {Array}  clusterCentroids
 *
 * @returns {Object} A point with a cluster label.
 */

function assignCluster (point, clusterCentroids) {
  const { label } = clusterCentroids.reduce((a, b) => {
    return getDistance(point, a) < getDistance(point, b) ? a : b;
  });

  return { ...point, label };
}

/**
 * @function  labelData
 *
 * @param {*} points
 * @param {*} clusterCentroids
 *
 * @returns {Array} An array of clusters.
 */

const labelData = (points, clusterCentroids) =>
  points.map(point => assignCluster(point, clusterCentroids));

module.exports = {
  labelData,
};
