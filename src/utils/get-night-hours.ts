/* eslint-disable guard-for-in */
/* eslint-disable camelcase */
import SunCalc from 'suncalc';

const getNightHours = (voyageData: any) => {
  type positionObj = {
    lat: number;
    lon: number;
    speed: number;
    course: number;
    heading: number;
    navigation_status: string | null;
    destination: string;
    last_position_epoch: number;
    last_position_UTC: string;
  };
  const positions: positionObj[] = voyageData.data.positions;

  interface DaysAtSeaObj {
    [key: string]: dayAtSea;
  }

  type dayAtSea = {
    timesBeforeSunRISE: Date[];
    timesAfterSunSET: Date[];
  };

  const daysAtSea: DaysAtSeaObj = {};

  for (let i:number = 0; i<= positions.length-1; i++) {
    const {lat, lon, last_position_UTC, last_position_epoch} = positions[i];
    const positionTimestamp = new Date(last_position_epoch * 1000);
    const positionDateAndTime = new Date(last_position_UTC);
    const positionDate = `${positionTimestamp.getFullYear()}-${positionTimestamp.getMonth() + 1
    }-${positionTimestamp.getDate()}`;
    const sunTimes = SunCalc.getTimes(positionTimestamp, lat, lon);
    const currentDaySunRISE = sunTimes.sunrise;
    const currentDaySunSET = sunTimes.sunset;

    daysAtSea[positionDate] = {
      // then create a property on daysAtSea with the key of {positionDate} and a value of a dayAtSea object
      timesBeforeSunRISE: [],
      timesAfterSunSET: [],
    };

    if (positionTimestamp.getTime() > currentDaySunSET.getTime()) {
      // Is it after dark?
      if (!daysAtSea[positionDate].timesAfterSunSET.length) {
        daysAtSea[positionDate].timesAfterSunSET.push(currentDaySunSET); // make the FIRST element of timesAfterSunSET the actuall sunset
      }
      daysAtSea[positionDate].timesAfterSunSET.push(positionTimestamp); // and collect that timestamp in timesAfterSunSET
    }

    if (positionDateAndTime.getTime() < currentDaySunRISE.getTime()) {
      // Is it before sunrise?
      daysAtSea[positionDate].timesBeforeSunRISE.push(positionTimestamp); // and collect that timestamp in timesBeforeSunRISE
    }
    if (i===positions.length-1) {
      for (const day in daysAtSea) {
          daysAtSea[day].timesBeforeSunRISE.length?
          daysAtSea[day].timesBeforeSunRISE.push(currentDaySunRISE):
          daysAtSea[day].timesBeforeSunRISE = []; // make the LAST element of timesBeforeSunRISE the actuall sunrise
      }
    }
  }
  console.table(daysAtSea);
  return 4;
};
// why are all arrays' length 2?
export default getNightHours;
