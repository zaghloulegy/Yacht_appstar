// const distance = require('@turf/distance')
import distance from '@turf/distance';
const helpers = require('@turf/helpers');

const voyageTotalDistance = (voyageData) => {
  const allCoors = voyageData.positions.map((coords) => {
    return [coords.lon, coords.lat];
  });

  let voyageDistance = 0;

  for (let i = 0; i < allCoors.length - 1; i++) {
    const from = helpers.point(allCoors[i]);
    const to = helpers.point(allCoors[i + 1]);
    voyageDistance += distance(from, to, {units: 'kilometers'});
  }
  const distanceUnRounded = voyageDistance * 0.539957;
  return distanceUnRounded.toFixed(1);
};

export default voyageTotalDistance;
