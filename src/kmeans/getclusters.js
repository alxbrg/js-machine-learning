'use strict';

function getClusters (labeledData) {
  return labeledData.reduce((acc, point) => {
    const cluster = acc[point.label] === undefined ? [] : acc[point.label];
    acc[point.label] = cluster.concat(point);
    return acc;
  }, [])
    .filter(cluster => cluster !== undefined);
}

module.exports = {
  getClusters,
};
