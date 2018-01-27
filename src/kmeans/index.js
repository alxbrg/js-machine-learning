'use strict';

const {
  assignClusters,
} = require('./assignclusters');

const {
  getClusters,
} = require('./getclusters');

const {
  getMean,
} = require('./getmean');

const {
  initClusterCentroids,
} = require('./initclustercentroids');

const {
  getMax,
  getMin,
} = require('../utils');

class Kmeans {
  constructor ({ K, key, iterations }) {
    this._K = K;
    this._iterations = iterations;
    this._key = key;
  }

  train (dataSet) {
    // rename key to `x`
    this.dataSet = dataSet.map((data) => {
      data.x = data[this._key];
      delete data[this._key];
      return data;
    });

    // initialize random cluster centroids
    let centroids = initClusterCentroids(
      this._K,
      [ getMin('x', this.dataSet), getMax('x', this.dataSet) ]
    );
    let clusters;

    // TODO: cost function
    let count = 0;
    while (count < this._iterations) {
      // assign cluster labels to data points and group the latter by cluster
      const clusteredData = assignClusters(this.dataSet, centroids);
      clusters = getClusters(clusteredData);

      // get mean values for each cluster and assign them to the centroids
      centroids = clusters.map(cluster => getMean(cluster));

      count++;
    }

    this.centroids = centroids;
    this.clusters = clusters;
  }

  label (data) {
    if (!this.centroids) {
      throw new Error('First train the algorithm using the `train` method');
    }

    return assignClusters(data, this.centroids);
  }
}

module.exports = {
  Kmeans,
};
