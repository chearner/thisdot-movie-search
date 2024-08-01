import { request } from '../utils/axiosRequest';

export const getGenres = () =>
  request({
    url: `https://0kadddxyh3.execute-api.us-east-1.amazonaws.com/genres/movies`,
    method: 'GET',
  });
