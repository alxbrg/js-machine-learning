'use strict';

const {
  getDistance,
} = require('../utils');

function getClosestMedoid (medoids, point) {
  let closestMedoid = medoids[0];

  // for each medoid get the medoid closest to the point
  for (let i = 0, l = medoids.length; i < l; i++) {
    const medoid = medoids[i] || closestMedoid;

    if (getDistance(point, medoid) < getDistance(point, closestMedoid)) {
      closestMedoid = medoid;
    }
  }

  return closestMedoid;
}

function labelData (medoids, data) {
  const labeledData = [];

  for (let i = 0, l = data.length; i < l; i++) {
    const point = data[i];

    const { label } = getClosestMedoid(medoids, point);

    labeledData.push({
      ...point,
      label,
    });
  }

  return labeledData;
}

module.exports = {
  labelData,
};
