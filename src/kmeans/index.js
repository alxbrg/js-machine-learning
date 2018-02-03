'use strict';

const {
  assignClusters,
} = require('./assignclusters');

const {
  calculateCost,
} = require('./calculatecost');

const {
  getClusters,
} = require('./getclusters');

const {
  getMean,
} = require('./getmean');

const {
  initCentroids,
} = require('./initcentroids');

class Kmeans {
  /**
   * @param {Number} K - Number of expected clusters
   * @param {String} key - Key holding the values used for calculating the means
   * @param {Number} maxIterations - Maximum number of iterations
   */
  constructor ({
    K,
    key,
    maxIterations = 10,
  }) {
    this._K = K;
    this._maxIterations = maxIterations;
    this._key = key;
  }

  /**
   * Train a data set
   * @param {Array}   dataSet - Training data set
   *
   * @return {Object} - deviation - Mean distance between each data points and
   *                  their assigned cluster's mean
   *                  - centroids
   *                  - clusters
   */
  train (dataSet) {
    // rename key to `x`
    const _dataSet = dataSet.map((data) => {
      return { x: data[this._key] };
    });

    let centroids = initCentroids(this._K, _dataSet);
    let clusters;
    let cost;

    for (let i = 0; i < this._maxIterations; i++) {
      // assign cluster labels to data points and group the latter by cluster
      const clusteredData = assignClusters(_dataSet, centroids);
      clusters = getClusters(clusteredData);

      // get mean values for each cluster and assign them to the centroids
      centroids = clusters.map(cluster => getMean(cluster));

      // calculate cost
      const _cost = calculateCost(centroids, clusters);

      // if `_cost` is equal to previous `cost`, assume we've reached the local
      // optimum (if it's greater than previous `cost`, something's going wrong)
      if (_cost >= cost) break;
      cost = _cost;
    }

    return {
      deviation: Math.pow(cost, 0.5) / dataSet.length,
      centroids,
      clusters,
    };
  }

  /**
   * Label a data point
   * @param {Object} data - Data point
   * @param {Array} centroids - Array of cluster centroids
   *
   * @returns {Array} An array of clusters.
   */
  label (data, centroids) {
    if (!Array.isArray(centroids)) {
      throw new Error('An array of `centroids` is required');
    }

    return assignClusters(data, centroids);
  }
}

module.exports = {
  Kmeans,
};
