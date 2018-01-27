'use strict';

function getClusters (clusteredData) {
  return clusteredData.reduce((acc, point) => {
    acc[point.label] = [].concat(acc[point.label] || [], point);
    return acc;
  }, []);
}

module.exports = {
  getClusters,
};
