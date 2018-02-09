'use strict';

function calculateCost (centroids, clusters) {
  // for each data point, measure abs diff between data and cluster mean
  return clusters.reduce((cost, cluster, i) =>
    cost + cluster.reduce((_cost, data) =>
      Math.abs(centroids[i].x - data.x) ** 2,
    0),
  0);
}

module.exports = {
  calculateCost,
};
