'use strict';

function sumDistances (cluster, medoid) {
  // sum of distances of points to the medoid
  let sum = 0;

  for (let i = 0, l = cluster.length; i < l; i++) {
    sum += Math.abs(cluster[i].x - medoid.x);
  }

  return sum;
}

function computeCost (labeledData, medoids) {
  let cost = 0;

  // sum of distances of each point to their respective medoid
  for (let i = 0, l = labeledData.length; i < l; i++) {
    const point = labeledData[i];
    const medoid = medoids.find(m => m && m.label === point.label);
    cost += sumDistances(point, medoid);
  }

  return cost;
}

module.exports = {
  computeCost,
  sumDistances,
};
