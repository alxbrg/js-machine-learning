'use strict';

const {
  sumDistances,
} = require('./cost');

const {
  getDistance,
} = require('../utils');

const map = new Map();

function getClosestObject (set, object) {
  let closest;
  let minDist;

  const key = `${set.length}${object.x}`;

  if (map.has(key)) {
    return map.get(key);
  } else {
    for (let i = 0, l = set.length; i < l; i++) {
      const _object = set[i];
      const dist = getDistance(object, _object);

      if (dist < minDist || minDist === undefined) {
        minDist = dist;
        closest = _object;
      }
    }

    map.set(key, closest);
    return closest;
  }
}

function build (data, K) {
  if (!Array.isArray(data)) throw new TypeError('data must be an array');
  if (typeof K !== 'number') throw new TypeError('K must be a number');

  let U = data.slice();

  /**
   * 1.
   * Initialize S by adding to it an object for which the sum of the distances
   * to all other objects is minimal.
   */

  const S = [];
  let object;
  let minDist;

  for (let i = 0, l = U.length; i < l; i++) {
    const _object = U[i];
    const dist = sumDistances(U, _object);

    if (dist < minDist || minDist === undefined) {
      minDist = dist;
      object = _object;
    }
  }

  S.push(object);

  while (S.length !== K) {
    let maxGain = 0;
    let selected;

    const mapI = new Map();

    /**
     * 2.
     * Consider an object i ∈ U as a candidate for inclusion into the set of
     * selected objects.
     */

    for (let i = 0, l = U.length; i < l; i++) {
      const objectI = U[i];

      const key = objectI.x;

      let gain = 0;

      if (mapI.has(key)) {
        gain = mapI.get(key);
      } else {
        /**
         * 3.
         * For an object j ∈ U − {i} compute the dissimilarity between j and the
         * closest object in S.
         */

        const _U = U.slice();
        _U.splice(i, 1);

        const mapJ = new Map();

        for (let j = 0, l = _U.length; j < l; j++) {
          const objectJ = _U[j];

          const key = objectJ.x;

          if (mapJ.has(key)) {
            gain += mapJ.get(key);
          } else {
            const closest = getClosestObject(S, objectJ);
            const dissimilarity = getDistance(closest, objectJ);

            /**
             * 4.
             * If dissimilarity > getDistance(i, j), object j will contribute to
             * the decision to select object i (because the quality of the
             * clustering may benefit).
             * Let contribution = max {dissimilarity − d(j, i), 0}
             */

            const distIJ = getDistance(objectI, objectJ);
            const contribution = Math.max(dissimilarity - distIJ, 0);

            /**
             * 5.
             * Compute the total gain obtained by adding i to S.
             */

            mapJ.set(key, contribution);
            gain += contribution;
          }
        }

        mapI.set(key, gain);
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
  }

  return S
    .sort((a, b) => a.x > b.x ? 1 : -1)
    .map((medoid, i) => ({ ...medoid, label: i }));
}

module.exports = {
  build,
};
