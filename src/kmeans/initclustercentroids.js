'use strict';

/**
 * @function initClusterCentroids
 *
 * @param   {Number} n
 * @param   {Array}  xRange
 * @param   {Array}  yRange
 *
 * @returns {Array}  Cluster centroids.
 */

const initClusterCentroids = (K, [ xMin, xMax ]) =>
  Array(K).fill().map((_, i) =>
    ({
      x: (xMax - xMin) / K * (i + 1),
      label: i,
    }));

module.exports = {
  initClusterCentroids,
};
