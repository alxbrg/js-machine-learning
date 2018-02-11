'use strict';

const {
  computeCost,
} = require('./cost');

const {
  getMedoids,
} = require('./getmedoids');

const {
  build,
} = require('./build');

const {
  labelData,
} = require('./labeldata');

function train ({ data, key }, K, maxIterations = 20) {
  const now = new Date().valueOf();

  // prep data
  const _data = data.map(point => ({ x: point[key] }));

  // build initial medoids
  let medoids = build(_data, K);
  let count = 0;
  let cost;

  while (count < maxIterations) {
    // (re-)label the data
    const labeledData = labelData(medoids, _data);

    // compute the (new) cost
    const _cost = computeCost(labeledData, medoids);

    // if cost decreased
    if (cost === undefined || _cost < cost) {
      // get medoids from labeled _data
      medoids = getMedoids(labeledData);
      cost = _cost;
      count++;
    } else {
      break;
    }
  }

  return {
    medoids,
  };
}

function label ({ medoids, data, key }) {
  // prep data
  const _data = data.map(point => ({ ...point, x: point[key] }));

  return labelData(medoids, _data)
    .map(point =>  ({ ...point, [key]: medoids[point.label].x }));
}

module.exports = {
  kmedoids: {
    label,
    train,
  },
};
