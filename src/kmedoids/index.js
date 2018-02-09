'use strict';

const {
  computeCost,
} = require('./cost');

const {
  getMedoids,
} = require('./getmedoids');

const {
  initMedoids,
} = require('./initmedoids');

const {
  labelData,
} = require('./labeldata');

function _train (data, K, maxIterations) {
  // initialize random medoids
  let medoids = initMedoids(K, data);
  let count = 0;
  let cost;

  while (count < maxIterations) {
    // (re-)label the data
    const labeledData = labelData(medoids, data);

    // compute the (new) cost
    const _cost = computeCost(labeledData, medoids);

    // if cost decreased
    if (cost === undefined || _cost < cost) {
      // get medoids from labeled data
      medoids = getMedoids(labeledData);
      cost = _cost;
      count++;
    } else {
      cost = _cost;
      break;
    }
  }

  return {
    cost,
    medoids,
  };
}

function train ({ data, key }, K, maxIterations = 20) {
  // prep data
  const _data = data.map(point => ({ x: point[key] }));
  let minCost;
  let count = 0;
  let medoids;

  while (count < maxIterations) {
    const {
      cost,
      medoids: _medoids,
    } = _train(_data, K, maxIterations);

    if (minCost === undefined || cost < minCost) {
      medoids = _medoids;
      minCost = cost;
    }

    count++;
  }

  return medoids;
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
