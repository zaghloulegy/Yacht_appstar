/* eslint-disable guard-for-in */
/* eslint-disable camelcase */
import {getSunrise, getSunset} from 'sunrise-sunset-js';

const hoursCalc = (end: any, start:any) => {
  const difference = end.getTime() - start.getTime();
  const hoursDifference = difference/1000/60/60;
  return hoursDifference;
};

const getNightHours = (voyageData: any) => {
  let nightHoursAtSea = 0;
  
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

  const daysAtSea : DaysAtSeaObj = {};

  for (let i :number = 0; i<= positions.length-1; i++) {
    const {lat, lon, last_position_epoch} = positions[i];
    const positionTimestamp = new Date(last_position_epoch * 1000);
    const positionDate = `${positionTimestamp.getUTCFullYear()}-${positionTimestamp.getUTCMonth() + 1}-${positionTimestamp.getUTCDate()}`;
    const currentDaySunRISE = getSunrise(lat, lon, new Date(positionDate));
    const currentDaySunSET = getSunset(lat, lon, new Date(positionDate));

    if (!daysAtSea[positionDate]) {
      daysAtSea[positionDate] = {
        // then create a property on daysAtSea with the key of {positionDate} and a value of a dayAtSea object
        timesBeforeSunRISE: [],
        timesAfterSunSET: [],
      };
    }

    if (positionTimestamp > currentDaySunSET) {
      // Is it after dark?
      daysAtSea[positionDate].timesAfterSunSET.push(positionTimestamp); // and collect that timestamp in timesAfterSunSET
    }

    if (positionTimestamp < currentDaySunRISE) {
      // Is it before sunrise?
      daysAtSea[positionDate].timesBeforeSunRISE.push(positionTimestamp); // and collect that timestamp in timesBeforeSunRISE
    }

    if (i===positions.length-1) {
      for (const day in daysAtSea) {
        if (daysAtSea[day].timesBeforeSunRISE.length) daysAtSea[day].timesBeforeSunRISE.unshift(currentDaySunRISE); // make the LAST element of timesBeforeSunRISE the actuall sunrise
        if (daysAtSea[day].timesAfterSunSET.length) daysAtSea[day].timesAfterSunSET.push(currentDaySunSET); // make the FIRST element of timesAfterSunSET the actuall sunset
        const beforeSRLength = daysAtSea[day].timesBeforeSunRISE.length;
        const afterSSLength = daysAtSea[day].timesAfterSunSET.length;

        if ( beforeSRLength ) {
          nightHoursAtSea += hoursCalc(daysAtSea[day].timesBeforeSunRISE[beforeSRLength-1], daysAtSea[day].timesBeforeSunRISE[0]);
        };
        if ( afterSSLength ) {
          nightHoursAtSea += hoursCalc(daysAtSea[day].timesAfterSunSET[afterSSLength-1], daysAtSea[day].timesAfterSunSET[0]);
        };
      }
    }
  }
  return Math.abs(nightHoursAtSea).toFixed(1);
};

export default getNightHours;
