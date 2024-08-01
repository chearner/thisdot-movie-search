import { request } from '../utils/axiosRequest';

export const getMovies = ({ pageNow, pageSize, searchString, searchGenre }) => {
  return request({
    url: `https://0kadddxyh3.execute-api.us-east-1.amazonaws.com/movies?limit=${pageSize}&page=${pageNow}&search=${searchString}&genre=${searchGenre}`,
    method: 'GET',
  });
};
