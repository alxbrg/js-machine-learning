'use strict';

function sumDistances (cluster, medoid) {
  // sum of distances of points to the medoid
  let sum = 0;
  for (const point of cluster) {
    sum += Math.abs(point.x - medoid.x);
  }
  return sum;
}

function formClusters (labeledData) {
  const clusters = [];

  // group data points by their cluster
  for (const point of labeledData) {
    clusters[point.label] = [].concat(clusters[point.label] || [], point);
  }

  return clusters.filter(cluster => cluster !== undefined);
}

function computeCost (labeledData, medoids) {
  const clusters = formClusters(labeledData);
  let cost = 0;

  // sum of distances of each point to their respective medoid
  for (const cluster of clusters) {
    const medoid = medoids.find(m => m && m.label === cluster[0].label);
    cost += sumDistances(cluster, medoid);
  }

  return cost;
}

module.exports = {
  computeCost,
  sumDistances,
};
