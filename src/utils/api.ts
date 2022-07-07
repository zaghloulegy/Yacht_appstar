import axios from 'axios';

const voyageAPI = axios.create({
  baseURL: 'https://api.datalastic.com/api/v0',
});

export const vesselAPICall = async (mmsi: any, start: any, end: any) => {
  try {
    const voyageData = await voyageAPI.get(`vessel_history?api-key=97cb3351-77ae-4f89-8272-b3aa2b81258c&mmsi=${mmsi}&from=${start}&to=${end}`);
    return voyageData;
  } catch (err) {
    console.log(err);
  }
};
