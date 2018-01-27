'use strict';

function getMean (points) {
  // sum x & y values
  const mean = points.reduce((acc, p) => ({
    ...p,
    x: (acc && acc.x + p.x) || p.x,
  }));

  return ({ ...mean, x: mean.x / points.length });
}

module.exports = {
  getMean,
};
