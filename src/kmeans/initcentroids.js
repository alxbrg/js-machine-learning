'use strict';

const {
  getDistance,
  getMax,
  getMin,
} = require('../utils');

/**
 * @function initCentroids
 *
 * @returns {Array} Cluster centroids.
 */

// TODO: combine with kMeans++ method of setting random initial centroids
function initCentroids (K, dataSet, centroids, maxIterations, index) {
  const min = getMin('x', [...dataSet, ...centroids]);
  const max = getMax('x', [...dataSet, ...centroids]);

  const inputLabels = centroids.map(centroid => centroid.label);

  // calculate mean distance between input centroids
  const meanCentroidDist = centroids.reduce((sum, centroid, i) => {
    const nextCentroid = centroids[i + 1];

    if (nextCentroid) {
      const labelDelta = Math.abs(centroid.label - nextCentroid.label);
      sum += getDistance(centroid, nextCentroid) / labelDelta;
    }

    return sum;
  }, 0) / (centroids.length - 1);

  // use the mean distance between input centroids if it exists
  // if the mean distance is 0, there's either 0 or only 1 input centroid
  // so we spread the initial centroids evenly across the data
  const meanDist = meanCentroidDist || ((max - min) / K);

  const initialCentroids = Array(K).fill().map((_, i) => {
    let delta = (meanDist / 2 / maxIterations) * index;

    // delta modifier should:
    //   - always be positive for the first centroid (since based on the min)
    //   - always be negative for the last centroids (since base on the max)
    //   - otherwise alternate between negative and positive values
    if ((i !== 0 && index % 2) || i === K - 1) delta *= -1;

    if (!inputLabels.includes(i)) {
      return {
        x: (meanDist * i) + min + delta,
      };
    }

    // use input centroid
    const { x } = centroids.find(centroid => centroid.label === i);
    return {
      x: x + delta,
    };
  });

  // ensure the centroids are in ascending order and get the appropriate labels
  return initialCentroids
    .sort((a, b) => a.x > b.x ? 1 : -1)
    .map((centroid, i) => ({ ...centroid, label: i }));
}

module.exports = {
  initCentroids,
};
