'use strict';

const {
  getDistance,
} = require('../utils');

/**
 * @private _assign
 *
 * @param {Object} point
 * @param {Array}  clusterCentroids
 *
 * @returns {Object} A point with a cluster label.
 */

function _assign (point, clusterCentroids) {
  const { label } = clusterCentroids.reduce((a, b) => {
    return getDistance(point, a) < getDistance(point, b) ? a : b;
  }, clusterCentroids[0]);

  return ({ ...point, label });
}

/**
 * @function  assignClusters
 *
 * @param {*} points
 * @param {*} clusterCentroids
 *
 * @returns {Array} An array of clusters.
 */

const assignClusters = (points, clusterCentroids) =>
  points.map(point => _assign(point, clusterCentroids));

module.exports = {
  assignClusters,
};
