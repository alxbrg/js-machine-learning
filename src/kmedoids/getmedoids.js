'use strict';

const {
  sumDistances,
} = require('./cost');

function getMedoids (labeledData) {
  return labeledData.reduce((acc, point) => {
    // competing points
    const label = point.label;
    const center = acc[label] || point;

    // compute cost for each potential medoid
    const distCenter = sumDistances(labeledData, center);
    const distPoint = sumDistances(labeledData, point);

    // keep the point which minimizes the cost
    acc[label] = Math.min(distCenter, distPoint) === distCenter
      ? center
      : point;

    return acc;
  }, []);
}

module.exports = {
  getMedoids,
};
