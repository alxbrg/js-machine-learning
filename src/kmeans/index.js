'use strict';

const {
  labelData,
} = require('./labeldata');

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

function _train (trainingData, initialCentroids, maxIterations) {
  let centroids = [].concat(initialCentroids);
  let clusters;
  let cost;

  for (let i = 0; i < maxIterations; i++) {
    // assign cluster labels to data points and group the latter by cluster
    const labeledData = labelData(trainingData, centroids);
    clusters = getClusters(labeledData);

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
    // TODO: use percentages ('margin of error') instead of absolute values
    cost,
    centroids,
  };
}

/**
 * Train a data set
 * @param {Array}  trainingData - Training data set
 * @param {Number} K - Number of expected clusters
 * @param {Number} maxIterations - Maximum number of iterations
 *
 * @return {Object} - cost - Sum of squared errors
 *                  - trainedData
 */
function train ({ data, key, initialCentroids = [] }, K, maxIterations = 20) {
  // prep trainingData
  const _trainingData = data.map(data => ({ x: data[key] }));
  const _initialCentroids = initialCentroids.map((centroid, i) =>
    ({
      x: centroid[key] || centroid.x,
      label: centroid.label || i,
    }));

  let cost;
  let trainedData;
  let optimum;

  // initialize centroids until we reach global optimum
  for (let i = 0; i < maxIterations; i++) {
    const newCentroids = initCentroids(
      K,
      _trainingData,
      _initialCentroids,
      maxIterations,
      i
    );

    trainedData = _train(_trainingData, newCentroids, maxIterations);

    const { cost: _cost } = trainedData;

    if (cost === undefined || _cost < cost) {
      cost = _cost;
      optimum = {
        cost,
        ...trainedData,
      };
    }
  }

  return optimum;
}

/**
 * Label a data point
 * @param {Object} data - Data point
 * @param {Array} centroids - Array of cluster centroids
 *
 * @returns {Array} An array of clusters.
 */
function label ({
  centroids,
  data,
  key,
}) {
  // prep data
  const _data = data.map(point => ({ ...point, x: point[key] }));

  if (!Array.isArray(centroids)) {
    throw new Error('An array of `centroids` is required');
  }

  return labelData(_data, centroids)
    .map(point =>  ({ ...point, [key]: centroids[point.label].x }));
}

module.exports = {
  kmeans: {
    label,
    train,
  },
};
