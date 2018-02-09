'use strict';

function getMean (cluster) {
  // sum x values
  const mean = cluster.reduce((sum, point) =>
    sum + point.x, 0) / cluster.length;

  return {
    label: cluster[0].label,
    x: mean,
  };
}

module.exports = {
  getMean,
};
