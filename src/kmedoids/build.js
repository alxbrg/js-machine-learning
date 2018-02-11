'use strict';

const {
  sumDistances,
} = require('./cost');

const {
  getDistance,
} = require('../utils');

function getClosestObject (set, object) {
  let closest;
  let minDist;

  for (const _object of set) {
    const dist = getDistance(object, _object);

    if (dist < minDist || minDist === undefined) {
      minDist = dist;
      closest = _object;
    }
  }

  return closest;
}

function build (data, K) {
  if (!Array.isArray(data)) throw new TypeError('data must be an array');
  if (typeof K !== 'number') throw new TypeError('K must be a number');

  let U = [...data];

  /**
   * 1.
   * Initialize S by adding to it an object for which the sum of the distances
   * to all other objects is minimal.
   */

  let S;
  let minDist;

  for (const object of U) {
    const dist = sumDistances(U, object);

    if (dist < minDist || minDist === undefined) {
      minDist = dist;
      S = [object];
    }
  }

  U = U.filter(({ x }) => x !== S[0].x);

  while (S.length !== K) {
    let maxGain = 0;
    let selected;

    /**
     * 2.
     * Consider an object i ∈ U as a candidate for inclusion into the set of
     * selected objects.
     */

    for (const i in U) {
      const objectI = U[i];

      let gain = 0;

      /**
       * 3.
       * For an object j ∈ U − {i} compute the dissimilarity between j and the
       * closest object in S.
       */

      const _U = [...U];
      _U.splice(i, 1);

      for (const j in _U) {
        const objectJ = _U[j];
        const closest = getClosestObject(S, objectJ);
        const dissimilarity = getDistance(closest, objectJ);

        /**
         * 4.
         * If dissimilarity > getDistance(i, j), object j will contribute to the
         * decision to select object i (because the quality of the clustering
         * may benefit).
         * Let contribution = max {dissimilarity − d(j, i), 0}
         */

        const distIJ = getDistance(objectI, objectJ);
        const contribution = Math.max(dissimilarity - distIJ, 0);

        /**
         * 5.
         * Compute the total gain obtained by adding i to S.
         */

        gain += contribution;
      }

      /**
       * 6.
       * Choose that object i that maximizes gain.
       */
      if (gain > maxGain) {
        maxGain = gain;
        selected = objectI;
      }
    }

    /**
     * These steps are performed until K objects have been selected
     */
    S.push(selected);
    U.splice(U.indexOf(selected), 1);
  }

  return S
    .sort((a, b) => a.x > b.x ? 1 : -1)
    .map((medoid, i) => ({ ...medoid, label: i }));
}

module.exports = {
  build,
};
