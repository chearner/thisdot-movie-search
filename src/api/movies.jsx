import { request } from '../services/request';

export const getMovies = () =>
  request({
    url: `/movies`,
    method: 'GET',
  });
