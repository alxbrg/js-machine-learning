'use strict';

function createIndexPool (length) {
  const indexes = [];

  function getRandomIndex () {
    const index = Math.floor(Math.random() * (length - 1));

    if (!indexes.includes(index)) {
      indexes.push(index);
      return index;
    }

    return getRandomIndex();
  };

  return getRandomIndex;
}

function initMedoids (K, data) {
  const medoids = [];
  const getRandomIndex = createIndexPool(data.length);

  for (let i = 0; i < K; i++) {
    const randomIndex = getRandomIndex();
    medoids.push(data[randomIndex]);
  }

  return medoids
    .sort((a, b) => a.x > b.x ? 1 : -1)
    .map((medoid, i) => ({ ...medoid, label: i }));
}

module.exports = {
  initMedoids,
};
