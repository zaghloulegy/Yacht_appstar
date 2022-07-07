import axios from 'axios';

const voyageAPI = axios.create({
  baseURL: 'https://api.datalastic.com/api/v0',
});

export const vesselAPICall = async (mmsi: any, start: any, end: any) => {
  try {
    const voyageData = await voyageAPI.get(`vessel_history?api-key=${process.env.API_KEY}&mmsi=${mmsi}&from=${start}&to=${end}`);
    return voyageData;
  } catch (err) {
    console.log(err);
  }
};
