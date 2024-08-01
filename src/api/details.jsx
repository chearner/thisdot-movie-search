import { request } from '../utils/axiosRequest';

export const getDetails = (movieId) => {
  return request({
    url: `https://0kadddxyh3.execute-api.us-east-1.amazonaws.com/movies/${movieId}`,
    method: 'GET',
  });
};
