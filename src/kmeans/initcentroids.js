'use strict';

const {
  getMax,
  getMin,
} = require('../utils');

/**
 * @function initCentroids
 *
 * @returns {Array} Cluster centroids.
 */

function initCentroids (K, dataSet) {
  const min = getMin('x', dataSet);
  const max = getMax('x', dataSet);

  // TODO: use kMeans++ method of setting random initial centroids
  // TODO: accept initial centroids as input
  return Array(K).fill().map((_, i) => ({
    x: ((max - min) / K) * i + min,
    label: i,
  }));
}

module.exports = {
  initCentroids,
};
